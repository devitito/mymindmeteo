<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AnalyzeController extends AbstractActionController
{
	public function addAction()
	{
		//can't contribute if not loged in
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/'.$identity->getName());
		}
	
		//@todo
		$viewModel = new ViewModel();
		$viewModel->setTerminal(true);
		return $viewModel;
	}
}