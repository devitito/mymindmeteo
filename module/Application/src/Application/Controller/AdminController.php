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
	
	public function mindsAction()
	{
		$this->layout('layout/admin');
		return new ViewModel();
	}
	
	public function statsAction()
	{
		$this->layout('layout/admin');
		return new ViewModel();
	}
	
	public function sensorsAction()
	{
		$this->layout('layout/admin');
		return new ViewModel();
	}
	
	public function createMindAction()
	{
		$this->layout('layout/admin');
		return new ViewModel();
	}
}