<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Application\Entity\Mind;

class ValidateController extends AbstractActionController
{
	public function mindNameAction()
	{
		try {
			$mindManager = $this->getServiceLocator()->get('mind-manager');
			$isAvailable = $mindManager->isAvailable(['name' => $_POST['name']]);
			$variables = array( 'valid' => $isAvailable);
		}
		catch (\Exception $e) {
			$variables = array( 'valid' => 'false', 'message' => 'Sorry, we can\'t check the avaibility of your mind name right now. Try again later.');
		}
		
		$json = new JsonModel( $variables );
		return $json;
	}
	
	public function mindEmailAction()
	{
		try {
			$mindManager = $this->getServiceLocator()->get('mind-manager');
			$isAvailable = $mindManager->isAvailable(['email' => $_POST['email']]);
			$variables = array( 'valid' => $isAvailable);
		}
		catch (\Exception $e) {
			$variables = array( 'valid' => 'false', 'message' => 'Sorry, we can\'t check the avaibility of your email right now. Try again later.');
		}
		
		$json = new JsonModel( $variables );
		return $json;
	}
}