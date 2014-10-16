<?php 
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class ErrorController extends AbstractActionController
{
	public function permissionsAction()
	{
		$this->getResponse()->setStatusCode(403);
		$viewModel = new ViewModel();
		$viewModel->setTerminal(true);
		return $viewModel;
	}
}
