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
use Zend\Http\PhpEnvironment\Response;
use Zend\Form\FormInterface;
use Zend\Authentication\AuthenticationService;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
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
    		$mind = new Mind();
    		$form->bind($mind);
    		$form->setData($data);
    	
    		if ($form->isValid()) {
    			//register new mind with filtered input
    			$mind->exchangeArray($form->getData());
    			$mindManager = $this->getServiceLocator()->get('mind-manager');  
				$mindManager->save($mind);	
				$authService = $this->getServiceLocator()->get('AuthService');
				$authService->getStorage()->write($mind->getName());
				
				return $this->redirect()->toUrl('/'.$mind->getName());
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
    
    public function loginAction()
    {
    	if ($identity = $this->identity()) {
    		return $this->redirect()->toUrl('/'.$identity);
    	}
    	
    	$formManager = $this->getServiceLocator()->get('FormElementManager');
    	/* @var $form \Zend\Form\Form */
    	$form = $formManager->get('login');
    	
    	$data = $this->prg();
    	
    	if ($data instanceof Response) {
    		return $data;
    	}
    	
    	if ($data !== false) {
    		// handle form
    		$mind = new Mind();
    		$form->bind($mind);
   			$form->setData($data);
    		
   			if ($form->isValid()) {
   				//attempt user authentication on filtered input
   				$mind->exchangeArray($form->getData(FormInterface::VALUES_AS_ARRAY));
   				$authService = $this->getServiceLocator()->get('AuthService');
   				$authService->getAdapter()
   							->setIdentity($mind->getNameoremail())
   							->setCredential($mind->getPassword());
   				$authResult = $authService->authenticate();   
				if ($authResult->isValid()) {				
					$identity = $authResult->getIdentity();
					$authService->getStorage()->write($identity);
					
					$sessionManager = $this->getServiceLocator()->get('Zend\Session\SessionManager');
					$sessionManager->regenerateId(true);
					
   					return $this->redirect()->toUrl('/'.$identity);
				}
   				else {
   					foreach ($authResult->getMessages() as $message) {
   						$this->flashMessenger()->addErrorMessage($message);
   					}
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
    
    public function logoutAction()
    {
    	$auth = $this->getServiceLocator()->get('AuthService');
    	if ($auth->hasIdentity()) {
    		$auth->clearIdentity();
    		$sessionManager = $this->getServiceLocator()->get('Zend\Session\SessionManager');
    		$sessionManager->destroy();
    		//$sessionManager = new SessionManager();
    		//$sessionManager->forgetMe();
    	}
    
    	return $this->redirect()->toRoute('home');
    }
}
