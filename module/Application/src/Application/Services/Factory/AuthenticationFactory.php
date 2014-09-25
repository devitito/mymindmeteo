<?php
/**
 * MindMeteo
 * 
 */

namespace Application\Services\Factory;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
//use Application\Services\Adapters\NameOrEmailAuthAdapter as AuthAdapter;
//use Zend\Authentication\AuthenticationService;
//use Zend\Crypt\Password\Bcrypt;

class AuthenticationFactory implements FactoryInterface
{
    public function createService(ServiceLocatorInterface $serviceLocator)
    {
    	/*$dbAdapter = $serviceLocator->get('Zend\Db\Adapter\Adapter');
    	$credentialValidationCallback = function($dbCredential, $requestCredential) {
    		return (new Bcrypt())->verify($requestCredential, $dbCredential);
    	};
    	$dbTableAuthAdapter  = new AuthAdapter($dbAdapter, 'minds', ['name', 'email'],'password', $credentialValidationCallback);
    	$authService = new AuthenticationService();
    	$authService->setAdapter($dbTableAuthAdapter);
    	return $authService;*/
    	return $serviceLocator->get('doctrine.authenticationservice.orm_default');
    }
}
