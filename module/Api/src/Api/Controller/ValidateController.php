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
			$name = $_POST['name'];
			if (!$name) throw new \Exception();
			$isAvailable = $mindManager->isAvailable(['name' => $name]);
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
			$email = $_POST['email'];
			if (!$email) throw new \Exception();
			$isAvailable = $mindManager->isAvailable(['email' => $email]);
			$variables = array( 'valid' => $isAvailable);
		}
		catch (\Exception $e) {
			$variables = array( 'valid' => 'false', 'message' => 'Sorry, we can\'t check the avaibility of your email right now. Try again later.');
		}
		
		$json = new JsonModel( $variables );
		return $json;
	}
}