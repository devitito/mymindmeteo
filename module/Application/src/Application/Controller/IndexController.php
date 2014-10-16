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

class IndexController extends AbstractActionController
{
	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
    public function indexAction()
    {
    }
    
    public function joinAction()
    {
    	//can't joined if loged in
    	if ($identity = $this->identity()) {
    		return $this->redirect()->toUrl('/'.$identity->getName());
    	}
    	
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
				$mind = $mindManager->save($mind);
				$authService = $this->getServiceLocator()->get('AuthService');
				$authService->getStorage()->write($mind);
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
    		return $this->redirect()->toUrl('/'.$identity->getName());
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
   				if (strpos($mind->getNameoremail(), '@') !== false)
   					// use email identity property
   					$authService->getAdapter()->getOptions()->setIdentityProperty('email');
   				else
   					// use username identity property
   					$authService->getAdapter()->getOptions()->setIdentityProperty('name');
   				$authService->getAdapter()
   							->setIdentity($mind->getNameoremail())
   							->setCredential($mind->getPassword());
   				$authResult = $authService->authenticate();   
				if ($authResult->isValid()) {				
					$identity = $authResult->getIdentity();//$authService->getAdapter()->getResultRowObject(array('name','id'/*,registration date*/));
					$authService->getStorage()->write($identity);
					
					$sessionManager = $this->getServiceLocator()->get('Zend\Session\SessionManager');
					$sessionManager->regenerateId(true);
					
					if ($identity->getRole() == $this->getServiceLocator()->get('profile-service')->getAdminRole())
						return $this->redirect()->toUrl('/admin/'.$identity->getName());
					else
   						return $this->redirect()->toUrl('/'.$identity->getName());
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
    		$sessionManager->forgetMe();
    	}
    
    	return $this->redirect()->toRoute('home');
    }
    
    /**
     * get entityManager
     *
     * @return EntityManager
     */
    private function getEntityManager()
    {
    	if (null === $this->entityManager) {
    		$this->entityManager = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
    	}
    
    	return $this->entityManager;
    }
}
