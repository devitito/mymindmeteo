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


class Module implements Feature\FormElementProviderInterface
{
    public function onBootstrap(MvcEvent $e)
    {
        $eventManager        = $e->getApplication()->getEventManager();
        $moduleRouteListener = new ModuleRouteListener();
        $moduleRouteListener->attach($eventManager);
        
        $sm  = $e->getApplication()->getServiceManager();
        $config = $sm->get('Config');
        if (!$config['exceptions']['show'])
        {
        	$exceptionstrategy = $sm->get('ViewManager')->getExceptionStrategy();
        	$exceptionstrategy->setExceptionTemplate('error/prod');
        }
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
}
