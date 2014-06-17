<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;

class ValidateController extends AbstractActionController
{
	public function mindNameAction()
	{
		// Get the username from request
		$username = $_POST['mindname'];
		
		// Check its existence (for example, execute a query from the database) ...
		$isAvailable = true; // or false
		
		$variables = array( 'valid' => $isAvailable);
		$json = new JsonModel( $variables );
		return $json;
	}
}