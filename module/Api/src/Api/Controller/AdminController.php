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
	
	public function recreateIndexesAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/');
		}
	
		$sm = $this->getServiceLocator()->get('search-manager');
		$sm->clearAll();
		$records = $this->getEntityManager()->getRepository('Application\Entity\Record')->findAll();
		foreach ($records as $record) {
			//index the new record in elasticsearch
			$this->getEventManager()->trigger('record.post', $this, ['record' => $record]);
		}
		
		$sensors = $this->getEntityManager()->getRepository('Application\Entity\Sensor')->findAll();
		foreach ($sensors as $sensor) {
			//index the new sensor in elasticsearch
			$this->getEventManager()->trigger('sensor.post', $this, ['sensor' => $sensor]);
		}
		
		$dateformat = new DateFormat();
		$date = $dateformat(new \DateTime('now'), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
		return new JsonModel([$date]);
	}
	
	public function identityAction()
	{
		$identity = $this->identity();
		
		$dateformat = new DateFormat();
		$date = $dateformat($identity->getJoindate(), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
		$data = [	'id' => $identity->getId(),
					'name' => $identity->getName(),
					'email' => $identity->getEmail(),
					'joindate' => $identity->getJoindate()->format('Y-m-d') ,
					'locale_joindate' => $date,
					'role' => $identity->getRole(),
					'locale' => $identity->getLocale(),
					'timezone' => $identity->getTimezone()];
		return new JsonModel($data);
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