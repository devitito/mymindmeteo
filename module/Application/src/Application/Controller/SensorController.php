<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Http\PhpEnvironment\Response;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Application\Entity\Sensor;
use Application\Entity\Sample;
use Application\Entity\Record;
use Application\Exception;
use Zend\Session\Container;

class SensorController extends AbstractActionController
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function recordAction()
	{
		//can't record if not loged in
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
			
		try {
			$record = new Record();
			$record->setId(uniqid());
			$record->setMind($identity);
			$sensor = $this->getEntityManager()->find('Application\Entity\Sensor', $this->getEvent()->getRouteMatch()->getParam('sensorid'));
			$record->setSensor($sensor);
			$sample = $this->getEntityManager()->find('Application\Entity\Sample', $this->getEvent()->getRouteMatch()->getParam('sampleid'));
			$record->setSample($sample);
			$record->setDate(new \DateTime("now"));
				
			$this->getEntityManager()->persist($record);
			$this->getEntityManager()->flush();
				
			//index the new record in elasticsearch
			$this->getEventManager()->trigger('record.post', $this, ['record' => $record]);
				
			return $this->redirect()->toUrl('/sensor/get/random');
		}
		catch (\Exception $e) {
			return $this->redirect()->toUrl('/sensor/get/random');
		}
	}
	
	public function getRandomAction()
	{
		//can't record if not loged in
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
			
		$sensor = $this->getEntityManager()->getRepository('Application\Entity\Sensor')->findRandom();
	
		$samples = $this->getEntityManager()->getRepository('Application\Entity\Sample')->findBy(['sensor' => $sensor->getId()]);
	
		$viewModel = new ViewModel();
		$viewModel->setVariables(['mind' => $identity, 'sensor' => $sensor, 'samplePos' => $samples[0], 'sampleNeg' => $samples[1]])
		->setTerminal(true);
		return $viewModel;
	}
	
	public function addAction()
	{
		//can't contribute if not loged in
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
			
		$formManager = $this->getServiceLocator()->get('FormElementManager');
		$sensorform = $formManager->get('sensor');
			
		$data = $this->prg();
	
		if ($data instanceof Response) {
			return $data;
		}
	
		if ($data !== false) {
			// handle form
			//$sensor = new Sensor();
			//$sensorform->bind($sensor);
			$sensorform->setData($data);
	
			if ($sensorform->isValid()) {
				//register new mind with filtered input
	
				$sensor = new Sensor();
				$sensor->setLabel($sensorform->get('label')->getValue());
				$sensor->setTopic($sensorform->get('topic')->getValue());
				$sensor->setMeteologist($identity->getName());
	
				$answerPositive = new Sample();
				$answerPositive->setSensor($sensor);
				$answerPositive->setId(uniqid());
				$answerPositive->setLabel($sensorform->get('answerPositive')->getValue());
				$answerPositive->setTopic($sensorform->get('topic')->getValue());
				//Very bad day!
				$answerPositive->setValue($sensorform->get('answerPositiveValue')->getValue());
	
				$answerNegative = new Sample();
				$answerNegative->setSensor($sensor);
				$answerNegative->setId(uniqid());
				$answerNegative->setLabel($sensorform->get('answerNegative')->getValue());
				$answerNegative->setTopic($sensorform->get('topic')->getValue());
				$answerNegative->setValue($sensorform->get('answerNegativeValue')->getValue());
	
				$this->getEntityManager()->persist($sensor);
				$this->getEntityManager()->persist($answerPositive);
				$this->getEntityManager()->persist($answerNegative);
	
				$this->getEntityManager()->flush();
	
				//index the new sensor in elasticsearch
				$this->getEventManager()->trigger('sensor.post', $this, ['sensor' => $sensor]);
				
				$viewModel = new ViewModel();
				$viewModel->setVariables(['message' => "Thanks for your contribution, we'll review it and let you know soon!",])
							->setTerminal(true);
				return $viewModel;
	
			}
			else {
				foreach ($sensorform as $elements) {
					$messages = $elements->getMessages();
					foreach ($messages as $message) {
						$this->flashMessenger()->addErrorMessage($message);
					}
				}
	
				$viewModel = new ViewModel();
				$viewModel->setTemplate('contribution/sensor/error');
				$this->getResponse()->setStatusCode(400);
				$viewModel->setTerminal(true);
				return $viewModel;
			}
		}
			
		$viewModel = new ViewModel();
		$viewModel->setVariables(['sensorform' => $sensorform])
		->setTerminal(true);
		return $viewModel;
	}
	
	/**
	 * get entityManager
	 *
	 * @return EntityManager
	 */
	private function getEntityManager()
	{
		if (null === $this->entityManager) {
			$this->entityManager = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
		}
	
		return $this->entityManager;
	}
}