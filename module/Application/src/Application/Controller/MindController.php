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
	
	public function nbTestCompletedAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
		
		$sm = $this->getServiceLocator()->get('search-manager');
		try {
			$nb = $sm->getTestedSensorCount($identity->getName());
		} catch (Exception $e) {
			$nb = '-';
		}
		$viewModel = new ViewModel();
		$viewModel->setVariables(['nbTest' => $nb])->setTerminal(true);
		return $viewModel;
	}
	
	public function nbSunnyDaysAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
	
		$sessionMind = new Container('mind');
		$viewModel = new ViewModel();
		$viewModel->setVariables(['nbSunny' => $sessionMind->sunny])->setTerminal(true);
		return $viewModel;
	}
	
	public function nbRainyDaysAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
	
		$sessionMind = new Container('mind');
		$viewModel = new ViewModel();
		$viewModel->setVariables(['nbRainy' => $sessionMind->rainy])->setTerminal(true);
		return $viewModel;
	}
	
	public function meteochartAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
		
		$sm = $this->getServiceLocator()->get('search-manager');
		try {
			$chart = $sm->fetchMeteoChartData($identity);
			return new JsonModel($chart);
		} catch (\Elastica\Exception\InvalidException $e) {
			$viewModel = new ViewModel();
			$viewModel->setTemplate('error/meteo-chart');
			$this->getResponse()->setStatusCode(400);
			$viewModel->setTerminal(true);
			return $viewModel;
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