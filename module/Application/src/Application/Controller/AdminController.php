<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AdminController extends AbstractActionController
{
	public function dashboardAction()
	{
		$this->layout('layout/admin');
		return new ViewModel();
	}
}