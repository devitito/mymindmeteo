<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AdminController extends AbstractActionController
{
	public function dashboardAction()
	{
		return new ViewModel();
	}
	
	public function mindsAction()
	{
		return new ViewModel();
	}
	
	public function statsAction()
	{
		return new ViewModel();
	}
	
	public function sensorsAction()
	{
		return new ViewModel();
	}
}