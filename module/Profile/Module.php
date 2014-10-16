<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Profile;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;
use Zend\Permissions\Acl\Role\GenericRole as Role;
use Zend\Permissions\Acl\Resource\GenericResource as Resource;
use Zend\View\Model\ViewModel;
use Zend\Stdlib\Response as StdResponse;

class Module
{
	const DEFAULT_ROLE = 'guest';
	
    public function onBootstrap(MvcEvent $e)
    {
        $this->initAcl($e);
        //check Acl when a route is matched
    	$e->getApplication()->getEventManager()->attach('route', array($this, 'checkAcl'));
    	//If the mind has no permission to access the route, checkAcl trigger a dispatch event error
    	$e->getApplication()->getEventManager()->attach(MvcEvent::EVENT_DISPATCH_ERROR, array($this, 'handlePermsissionDenied'));
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
    
    public function initAcl(MvcEvent $e) 
    {
    	$config = $e->getApplication()->getServiceManager()->get('Config');
    	
    	if (!isset($config['acl']['roles']) || !isset($config['acl']['resources'])) {
    		throw new \Exception('Invalid ACL Config found');
    	}
    	
    	$roles = $config['acl']['roles'];
    	if (!isset($roles[self::DEFAULT_ROLE])) {
    		$roles[self::DEFAULT_ROLE] = '';
    	}
    	 
    	$acl = new \Zend\Permissions\Acl\Acl();
    	$this->addRoles($acl, $roles);
	    
	    //adding resources
	    $resources = $config['acl']['resources'];
	    $this->addResources($acl, $resources);
    
    	//setting to view
    	$e->getViewModel()->acl = $acl;
    }
    
    /**
     * Adds Roles to ACL
     *
     * @param array $roles
     */
    protected function addRoles($acl, $roles)
    {
    	foreach ($roles as $name => $parent) {
	    	if (!$acl->hasRole($name)) {
	    		if (empty($parent)) {
	    			$parent = array();
	    		} else {
	    			$parent = explode(',', $parent);
	    		}
	    		$acl->addRole(new Role($name), $parent);
	    	}
	    }
    }
    
    /**
     * Adds Resources to ACL
     *
     * @param $resources
     * @throws \Exception
     */
    protected function addResources($acl, $resources)
    {
    	foreach ($resources as $permission => $controllers) {
    		foreach ($controllers as $controller => $actions) {
    			if ($controller == 'all') {
    				$controller = null;
    			} else {
    				if (!$acl->hasResource($controller)) {
    					$acl->addResource(new Resource($controller));
    				}
    			}
    
    			foreach ($actions as $action => $role) {
    				if ($action == 'all') {
    					$action = null;
    				}
    
    				if ($permission == 'allow') {
    					$acl->allow($role, $controller, $action);
    				} elseif ($permission == 'deny') {
    					$acl->deny($role, $controller, $action);
    				} else {
    					throw new \Exception('No valid permission defined: ' . $permission);
    				}
    			}
    		}
    	}
    }
    
    public function checkAcl(MvcEvent $e) 
    {
    	$routeMatch = $e->getRouteMatch();
    	$controller = $routeMatch->getParam('controller');
    	$action = $routeMatch->getParam('action');
    	
    	$authService = $e->getApplication()->getServiceManager()->get('AuthService');
    	$role = self::DEFAULT_ROLE;
	    
	    if ($authService->hasIdentity()) {
    		$mind = $authService->getIdentity();
    		$role = $mind->getRole(); 
		}
    	
		if (!$e->getViewModel()->acl->hasResource($controller)) {
			throw new \Exception('Resource ' . $controller . ' not defined');
		}
		
    	if (!$e->getViewModel()->acl->isAllowed($role, $controller, $action)) {
    		$e->setError('ACL_ACCESS_DENIED')
    			->setParam('route', $routeMatch->getMatchedRouteName());
    		$e->getApplication()->getEventManager()->trigger('dispatch.error', $e);
    	}
    }
    
    public function handlePermsissionDenied(MvcEvent $e)
    {
    	$error = $e->getError();
    	
    	if (empty($error) || $error != "ACL_ACCESS_DENIED") {
    		return;
    	}
    	
    	$result = $e->getResult();
    	
    	if ($result instanceof StdResponse) {
    		return;
    	}
    	
    	$model = new ViewModel();
    	$model->setTemplate('error/403')->setTerminal(true);
    	
    	$e->setViewModel($model);
    	
    	$response = $e->getResponse();
    	$response->setStatusCode(403);
    	
    	$e->setResponse($response);
    	$e->setResult($model);
    	
    	return false;
    }
}
