<?php

namespace Api\Controller\Admin;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\I18n\View\Helper\DateFormat;
use IntlDateFormatter;
use Zend\Mvc\Service\ValidatorManagerFactory;
use Application\Entity\Mind;
use Application\Exception;

class MindController extends AbstractRestfulController 
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function getList()
	{
		$identity = $this->identity();
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		try{
			
			$data = [];
			$minds = $mindManager->fetchAll();
			foreach ($minds as $mind) {
				$dateformat = new DateFormat();
				$date = $dateformat($mind->getJoindate(), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
				$data [] = ['id' => $mind->getId(), 
							'name' => $mind->getName(), 
							'joindate' => $mind->getJoindate()->format('Y-m-d'),
							'locale_joindate' => $date, 
							'role' => $mind->getRole(), 
							'locale' => $mind->getLocale(),
							'timezone' => $mind->getTimezone()];
			}
			return new JsonModel($data);
		} catch (Exception $e) {
			$this->getResponse()->setStatusCode(400);
			return new JsonModel($e->getMessage());
		}
	}
	
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
	}
	
	public function update($id, $data)
	{
		$identity = $this->identity();
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		$filters = new \Application\InputFilters\AdminMindSave();
		
		//exclude the current mind in the search
		$options = array (
				'table' => 'minds',
				'field' => 'email',
				'adapter' => $this->getServiceLocator()->get('Zend\Db\Adapter\Adapter'),
				'messages' => array(
						\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified email already exists in database'
				),
				'exclude' =>  array(
		            'field' => 'id',
		            'value' => $id
       			)
		);
		$validator = new \Zend\Validator\Db\NoRecordExists($options);
		$filters->get('email')->getValidatorChain()->attach($validator);
		
		$isValid = $filters->setData($data)
							->isValid();

		if ($isValid) {
			$mind = new Mind($data);
			$mindManager->save($mind);
			return new JsonModel(['id' => $mind->getId()]);
		}
		else {
			$errorMessages = $filters->getMessages();
			$this->getResponse()->setStatusCode(400);
			return new JsonModel($errorMessages);
		}
	}
	
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