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
        return new ViewModel();
    }
    
    public function joinAction()
    {
    	$request = $this->getRequest();

    	if($request->isPost())
    	{
    		$data = [ 
				'name' => $_POST['mindname'],
				'email' => $_POST['mindmail'],
				'password' => $_POST['mindpass'],
				'id' => null ];
		
			$mind = new Mind($data);
			//TODO registration form validation
			$mindManager = $this->getServiceLocator()->get('mind-manager');  		
			$mindManager->save($mind);	
			return new ViewModel(array('params' => $data));
    	}
    	else
    	{ 
    		throw new Exception('internal error');
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
    	
    	$error = false;
    	
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
   					$error = 'Invalid mind or password';
   				}
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
