<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Application\Exception;
use Zend\View\Model\ViewModel;
use Application\Entity\Mind;
use Application\Services\MindManager;

class MindController extends AbstractActionController
{
	public function dashboardAction()
	{
		//check the mind exist
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		$mind = $mindManager->getMind(['name' => $this->getEvent()->getRouteMatch()->getParam('mindname')]);
		if (!$mind) {
			$viewModel = new ViewModel();
			$viewModel->setTemplate('error/404');
			return $viewModel;
		}
		
		if ($identity = $this->identity()) {
    		return ['mind' => $mind];
    	}
		else {
			return $this->redirect()->toUrl('/login');
		}
	}
}