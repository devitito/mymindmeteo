<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Application\Entity\Mind;
use Zend\I18n\View\Helper\DateFormat;
use IntlDateFormatter;

class AdminController extends AbstractActionController
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function mindListAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/');
		}
		
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		try{
			$data = [];
			$minds = $mindManager->fetchAll();
			foreach ($minds as $mind) {
				$dateformat = new DateFormat();
				$date = $dateformat($mind->getJoindate(), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
				$data [] = ['id' => $mind->getId(), 'name' => $mind->getName(), 'joindate' => $date , 'role' => $mind->getRole(), 'locale' => $mind->getLocale()];
			}
			return new JsonModel($data);
		} catch (Exception $e) {
			
		}
	}
	
	public function recoverRecordsAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/');
		}
	
		$records = $this->getEntityManager()->getRepository('Application\Entity\Record')->fetchUnIndexed();
		foreach ($records as $record) {
			//index the new record in elasticsearch
			$this->getEventManager()->trigger('record.post', $this, ['record' => $record]);
		}
		$dateformat = new DateFormat();
		$date = $dateformat(new \DateTime('now'), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
		return new JsonModel([$date]);
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