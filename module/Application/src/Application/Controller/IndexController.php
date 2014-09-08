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
use Application\Exception;

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
   				$mindManager = $this->getServiceLocator()->get('mind-manager');  		
   				$mindManager->save($mind);	
   				return new ViewModel(array('params' => $form->getData()));
   			} 
   			else 
   			{
   				$messages = implode(",", $form->getMessages());
   				throw new Exception($messages);
    		}
    	}
    	else
    	{ 
    		throw new Exception('internal error');
    	}	
    }
    
    public function loginAction()
    {
    	$formManager = $this->getServiceLocator()->get('FormElementManager');
    	$form = $formManager->get('login');
    	
    	$data = $this->prg();
    	
    	if ($data instanceof Response) {
    		return $data;
    	}
    	
    	$error = false;
    	
    	if ($data !== false) {
    		// handle form
    		$mind = $this->getServiceLocator()->get('entity.mind');
    		$form->bind($mind);
    		
    		/* @var $form \Zend\Form\Form */	
    		try {
    			$form->setData($data);
    		
    			if ($form->isValid()) {
    		
    				// attempt user authentication
    				return $this->redirect()->toRoute('dashboard');
    				//$this->flashMessenger()->addInfoMessage('You attempted to login as ' . $form->getElements()['login']->getValue());
    				//var_dump($form->getData());
    			}
    		
    		} catch (\Exception $e) {
    			// TODO add error to form errors
    			$this->flashMessenger()->addErrorMessage($e->getMessage());
    			$error = $e->getMessage();
    			// return $this->redirect()->toRoute('application/login');
    			
    		}
    		
    	}
    	return array(
    			'error' => $error,
    			'form' => $form
    	);
    }
    
    public function dashboardAction()
    {
    	return new ViewModel();
    }
}
