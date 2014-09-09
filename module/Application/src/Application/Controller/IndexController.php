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
use Application\Services\LoginManager;
use Application\Exception;
use Zend\Http\PhpEnvironment\Response;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
    	$formManager = $this->getServiceLocator()->get('FormElementManager');
    	$form = $formManager->get('quickRegistration');
    	
        return ['form' => $form];
    }
    
    public function joinAction()
    {
     	$formManager = $this->getServiceLocator()->get('FormElementManager');
    	$form = $formManager->get('quickRegistration');
    	
    	$data = $this->prg();
    	 
    	if ($data instanceof Response) {
    		return $data;
    	}
    	 
    	if ($data !== false) {
    		// handle form
    		$mind = $this->getServiceLocator()->get('entity.mind');
    		$form->bind($mind);
    		$form->setData($data);
    	
    		//TODO quickreg form validation
    	//	if ($form->isValid()) {
    			//register new mind
    			$mindManager = $this->getServiceLocator()->get('mind-manager');  
    			$mind = new Mind($data);
				$mindManager->save($mind);	
				return $this->redirect()->toRoute('dashboard');
    	//	}
    	}
    }
    
    public function loginAction()
    {
    	$formManager = $this->getServiceLocator()->get('FormElementManager');
    	/* @var $form \Zend\Form\Form */
    	$form = $formManager->get('login');
    	
    	$data = $this->prg();
    	
    	if ($data instanceof Response) {
    		return $data;
    	}
    	
    	if ($data !== false) {
    		// handle form
    		$mind = $this->getServiceLocator()->get('entity.mind');
    		$form->bind($mind);
   			$form->setData($data);
    		
   			if ($form->isValid()) {
   				//attempt user authentication
   				$loginManager = $this->getServiceLocator()->get('login-manager');
   				if ($loginManager->checkCredentials($data)) {
   					return $this->redirect()->toRoute('dashboard');
   				}
   				else {
   					$this->flashMessenger()->addErrorMessage('Invalid mind or password');
   				}
   			}
   			else {
   				foreach ($form as $elements) {
   					$messages = $elements->getMessages();
   					foreach ($messages as $message) {
   						$this->flashMessenger()->addErrorMessage('<b>'.$elements->getLabel() . '</b> : ' .$message);
   					}
   				}
   			}
    	}
    	
    	return ['form' => $form];
    }
    
    public function dashboardAction()
    {
    	return new ViewModel();
    }
}
