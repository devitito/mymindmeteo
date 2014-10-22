<?php

namespace Api\Controller\Admin;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use Zend\I18n\View\Helper\DateFormat;
use IntlDateFormatter;

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
				$data [] = ['id' => $mind->getId(), 'name' => $mind->getName(), 'joindate' => $date , 'role' => $mind->getRole(), 
							'locale' => $mind->getLocale(),
							'lang' => substr($mind->getLocale(), 0, 2)];
			}
			return new JsonModel($data);
		} catch (Exception $e) {
				
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
						'joindate' => $date , 
						'role' => $mind->getRole(), 
						'locale' => $mind->getLocale(),
						'lang' => substr($mind->getLocale(), 0, 2)];
			return new JsonModel($data);
		} catch (Exception $e) {
		
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