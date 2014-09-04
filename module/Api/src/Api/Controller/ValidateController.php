<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Application\Entity\Mind;

class ValidateController extends AbstractActionController
{
	public function mindNameAction()
	{
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		$isAvailable = $mindManager->isAvailable(['name' => $_POST['mindname']]);
		
		$variables = array( 'valid' => $isAvailable);
		$json = new JsonModel( $variables );
		return $json;
	}
	
	public function mindEmailAction()
	{
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		$isAvailable = $mindManager->isAvailable(['email' => $_POST['mindmail']]);
	
		$variables = array( 'valid' => $isAvailable);
		$json = new JsonModel( $variables );
		return $json;
	}
}