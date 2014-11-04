<?php

namespace Api\Controller\Admin;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Application\Entity\Sample;
use Application\Exception;

class SensorController extends AbstractRestfulController 
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function getList()
	{
		$identity = $this->identity();
		$searchManager = $this->getServiceLocator()->get('search-manager');
		try{
			$count = $this->params()->fromQuery('count');
			$page = $this->params()->fromQuery('page');
			
			$sensors = $searchManager->request('sensor-list', ['count' => $count, 'page' => $page]);
			return new JsonModel($sensors);
		} catch (Exception $e) {
			$this->getResponse()->setStatusCode(400);
			return new JsonModel($e->getMessage());
		}
	}
	/*
	public function get($id)
	{
		$identity = $this->identity();
		try{
			$mind = $this->getEntityManager()->getRepository('Application\Entity\Mind')->find($id);
			$dateformat = new DateFormat();
			$date = $dateformat($mind->getJoindate(), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
			$data = [	'id' => $mind->getId(), 
						'name' => $mind->getName(), 
						'email' => $mind->getEmail(),
						'joindate' => $mind->getJoindate()->format('Y-m-d'),
						'locale_joindate' => $date, 
						'role' => $mind->getRole(), 
						'locale' => $mind->getLocale(),
						'timezone' => $mind->getTimezone()];
			return new JsonModel($data);
		} catch (Exception $e) {
			$this->getResponse()->setStatusCode(400);
			return new JsonModel([$e->getMessage()]);
		}
	}*/
	
	public function update($id, $data)
	{
		$identity = $this->identity();
		try {
			//@todo validate data
			
			//Get sensor and sample & update
			$existingSensor = $this->getEntityManager()->getRepository('\Application\Entity\Sensor')->find($id);
			$existingSensor->setLabel($data['label']);
			$existingSensor->setTopic($data['topic']);
			$existingSensor->setMeteologist($data['meteologist']);
			$existingSensor->setStatus($data['status']);
			
			foreach($data['samples'] as $sample) {
				$existingSample = $this->getEntityManager()->getRepository('\Application\Entity\Sample')->find($sample['id']);
				$existingSample->setLabel($sample['label']);
				$existingSample->setTopic($sample['topic']);
				$existingSample->setValue($sample['value']);
			}

			$this->getEntityManager()->flush();
			
			//index the updated sensor in elasticsearch
			$this->getEventManager()->trigger('sensor.post', $this, ['sensor' => $existingSensor]);
			return new JsonModel(['id' => $existingSensor->getId()]);
		} catch (Exception $e) {
			$errorMessages = $e->getMessage();
			$this->getResponse()->setStatusCode(400);
			return new JsonModel($errorMessages);
		}
	}
	/*
	public function create($data)
	{
		$identity = $this->identity();
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		try{
			//validate data before insert
			$res = $mindManager->isValid($data);
			
			if ($res['result']) {
				$mind = new Mind($data);
				$mindManager->save($mind);
				return new JsonModel(['data' => $mind]);
			}
			else {
				$errorMessages = $res['messages'];
				$this->getResponse()->setStatusCode(400);
				return new JsonModel($errorMessages);
			}
		} catch (Exception $e) {
			$this->getResponse()->setStatusCode(400);
			return new JsonModel([$e->getMessage()]);
		}
	}
	
	public function delete($id)
	{
		$identity = $this->identity();
		try{
			$mind = $this->getEntityManager()->getRepository('Application\Entity\Mind')->find($id);
			$this->getEntityManager()->remove($mind);
			$this->getEntityManager()->flush();
			return new JsonModel(['data' => 'Mind deleted']);
		} catch (Exception $e) {
			$this->getResponse()->setStatusCode(400);
			return new JsonModel([$e->getMessage()]);
		}
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