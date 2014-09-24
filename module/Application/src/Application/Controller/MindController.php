<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Services\MindManager;

class MindController extends AbstractActionController
{
	public function dashboardAction()
	{
		$requestedMind = $this->getEvent()->getRouteMatch()->getParam('mindname');
		//Someone wants to access the page of a mind.
		//check if the requested mind exist
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		$mind = $mindManager->getMind(['name' => $requestedMind]);
		if (!$mind) {
			$viewModel = new ViewModel();
			$viewModel->setTemplate('error/404');
			return $viewModel;
		}
		
		$identity = $this->identity();
		if (!$identity)
			//someone unidentified tries to access a mind's public page: he has to login first
			return $this->redirect()->toUrl('/login');
		else if ($identity == $requestedMind) {
			//the mind identified in this session wants to access his dashboard
			return ['mind' => $mind];
    	}
		else {
			//@todo the mind identified in this session tries to access the public page of another mind
			return $this->redirect()->toUrl('/');
		}
	}
}