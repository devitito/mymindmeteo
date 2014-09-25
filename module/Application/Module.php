<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Application\Models\Mind;
use Application\Models\DbTable\MindTable;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\ModuleManager\Feature;
use Zend\Stdlib\Hydrator\ClassMethods;
//use Application\Services\Adapters\NameOrEmailAuthAdapter as AuthAdapter;
//use Zend\Authentication\AuthenticationService;
//use Zend\Crypt\Password\Bcrypt;
use Zend\Session\SessionManager;
use Zend\Session\Config\SessionConfig;
use Zend\Session\Container;

class Module implements Feature\FormElementProviderInterface
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
      /*  
        $sm  = $e->getApplication()->getServiceManager();
        $config = $sm->get('Config');
        if (!$config['exceptions']['show'])
        {
        	$exceptionstrategy = $sm->get('ViewManager')->getExceptionStrategy();
        	$exceptionstrategy->setExceptionTemplate('error/prod');
        }*/
        
        $this->initSession($e);
        
        /**
         * @var $sharedEventManager \Zend\EventManager\SharedEventManager
         */
        /*$sharedEventManager->attach('entities', 'remove.pre', function (EventInterface $e) {
        	// check acl
        });*/
    }
    
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }
    
    public function getServiceConfig()
    {
    	return array(
    		'factories' => array(
    			'Application\Models\DbTable\MindTable' =>  function($sm) {
    				$tableGateway = $sm->get('MindTableGateway');
    				$table = new MindTable($tableGateway);
    				return $table;
    			},
    			'MindTableGateway' => function ($sm) {
    				$dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
    				$resultSetPrototype = new ResultSet();
    				$resultSetPrototype->setArrayObjectPrototype(new Mind());
    				return new TableGateway('minds', $dbAdapter, null, $resultSetPrototype);
    			},
    		/*	'AuthService' => function($sm) {
    				$dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
			    	$credentialValidationCallback = function($dbCredential, $requestCredential) {
			    		return (new Bcrypt())->verify($requestCredential, $dbCredential);
			    	};
			    	$dbTableAuthAdapter  = new AuthAdapter($dbAdapter, 'minds', ['name', 'email'],'password', $credentialValidationCallback);
			    	$authService = new AuthenticationService();
			    	$authService->setAdapter($dbTableAuthAdapter);
			    	return $authService;
    			},*/
    			'Zend\Session\SessionManager' => function ($sm) {
    				$config = $sm->get('config');
    				if (isset($config['session'])) {
    					$session = $config['session'];
    			
    					$sessionConfig = null;
    					if (isset($session['config'])) {
    						$class = isset($session['config']['class'])  ? $session['config']['class'] : 'Zend\Session\Config\SessionConfig';
    						$options = isset($session['config']['options']) ? $session['config']['options'] : array();
    						$sessionConfig = new $class();
    						$sessionConfig->setOptions($options);
    					}
    			
    					$sessionStorage = null;
    					if (isset($session['storage'])) {
    						$class = $session['storage'];
    						$sessionStorage = new $class();
    					}
    			
    					$sessionSaveHandler = null;
    					if (isset($session['save_handler'])) {
    						// class should be fetched from service manager since it will require constructor arguments
    						$sessionSaveHandler = $sm->get($session['save_handler']);
    					}
    			
    					$sessionManager = new SessionManager($sessionConfig, $sessionStorage, $sessionSaveHandler);
    			
    					if (isset($session['validator'])) {
    						$chain = $sessionManager->getValidatorChain();
    						foreach ($session['validator'] as $validator) {
    							$validator = new $validator();
    							$chain->attach('session.validate', array($validator, 'isValid'));
    			
    						}
    					}
    				} else {
    					$sessionManager = new SessionManager();
    				}
    				Container::setDefaultManager($sessionManager);
    				return $sessionManager;
    			},
    		),
    	);
    } 

    /**
     * Expected to return \Zend\ServiceManager\Config object or array to
     * seed such an object.
     *
     * @return array|\Zend\ServiceManager\Config
     */
    public function getFormElementConfig()
    {
    	return
    	array(
    		'factories' =>
    			array (
    				'login' => function($sm) {
    					$form = new \Application\Forms\Login;
    					$form->setInputFilter(new \Application\InputFilters\Login);
    					$form->setHydrator(new ClassMethods());
    					return $form;
    				},
    				'quickRegistration' => function($sm) {
    					$form = new \Application\Forms\QuickRegistration;
    					$dbAdapter = $sm->getServiceLocator()->get('Zend\Db\Adapter\Adapter');
    					$form->setInputFilter(new \Application\InputFilters\QuickRegistration($dbAdapter));
    					$form->setHydrator(new ClassMethods());
    					return $form;
    				}
    		)
    	);
    }
    
    public function initSession($e)
    {
    	$sessionManager = $e->getApplication()
                     		 ->getServiceManager()
                     		 ->get('Zend\Session\SessionManager');
        $sessionManager->start();
    }
}
