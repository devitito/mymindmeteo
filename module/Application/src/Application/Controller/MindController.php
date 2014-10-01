<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Http\PhpEnvironment\Response;
use Zend\View\Model\ViewModel;
use Application\Entity\Sensor;
use Application\Entity\Sample;

class MindController extends AbstractActionController
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function dashboardAction()
	{
		$requestedMind = $this->getEvent()->getRouteMatch()->getParam('mindname');
		//Someone wants to access the page of a mind.
		//check if the requested mind exist
		$mind = $this->getEntityManager()->getRepository('Application\Entity\Mind')->findOneBy(['name' => $requestedMind]);
		if (!$mind) {
			$viewModel = new ViewModel();
			$viewModel->setTemplate('error/404');
			$this->getResponse()->setStatusCode(404);
			return $viewModel;
		}
		
		$identity = $this->identity();
		if (!$identity)
			//someone unidentified tries to access a mind's public page: he has to login first
			return $this->redirect()->toUrl('/login');
		else if ($identity->getName() == $requestedMind) {
			//the mind identified in this session wants to access his dashboard
			return ['mind' => $mind];
    	}
		else {
			//@todo the mind identified in this session tries to access the public page of another mind
			return $this->redirect()->toUrl('/'.$requestedMind.'/public');
		}
	}
	
	public function addSensorAndSamplesAction()
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
				
			/*	$sensor = new Sensor();
				$sensor->setId(uniqid());
				$sensor->setLabel($sensorform->get('label')->getValue());
				$sensor->setTopic($sensorform->get('topic')->getValue());
				$sensor->setMeteologist($identity->getName());
				
				$answerPositive = new Sample();
				$answerPositive->setSensor($sensor);
				$answerPositive->setId(uniqid());
				$answerPositive->setLabel($sensorform->get('answerPositive')->getValue());
				$answerPositive->setTopic($sensorform->get('topic')->getValue());
				//Very bad day!
				$answerPositive->setValue(-10);
				
				$answerNegative = new Sample();
				$answerNegative->setSensor($sensor);
				$answerNegative->setId(uniqid());
				$answerNegative->setLabel($sensorform->get('answerNegative')->getValue());
				$answerNegative->setTopic($sensorform->get('topic')->getValue());
				//normal!
				$answerNegative->setValue(1);
				
				$this->getEntityManager()->persist($sensor);
				$this->getEntityManager()->persist($answerPositive);
				$this->getEntityManager()->persist($answerNegative);
				
				$this->getEntityManager()->flush();
				*/
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