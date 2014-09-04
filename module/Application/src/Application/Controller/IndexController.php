<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Entity\Mind;
use Application\Services\MindManager;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
    
    public function joinAction()
    {
    	$request = $this->getRequest();

    	if($request->isPost())
    	{
    		$form = new \Application\Forms\RegistrationForm();
    		
    		$data = [ 
				'name' => $_POST['mindname'],
				'email' => $_POST['mindmail'],
				'password' => $_POST['mindpass'],
				'id' => null ];
		
			$mind = new Mind($data);
    		
    		$form->setInputFilter($mind->getInputFilter());
    		$form->setData($request->getPost());
    		 
    		if($form->isValid())
    		{
    			//@todo http://www.slideshare.net/maraspin/error-handling-in-zf2-form-messages-custom-error-pages-logging
    			// Validate the form
    			//todo handle save exception
    			$mindManager = $this->getServiceLocator()->get('mind-manager');  		
    			$mindManager->save($mind);	
   				return new ViewModel(array('params' => $form->getData()));
   				
   			} 
   			else 
   			{
   				$messages = implode(",", $form->getMessages());
   				$viewModel = new ViewModel(['message' => $messages]);
   				$viewModel->setTemplate('error/index');
   				return $viewModel;
    		}
    	}
    	else
    	{ 
    		$viewModel = new ViewModel(['message' => 'internal error']);
    		$viewModel->setTemplate('error/index');
    		return $viewModel;
    	}	
    }
}
