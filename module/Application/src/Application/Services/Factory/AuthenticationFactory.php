<?php
/**
 * MindMeteo
 * 
 */

namespace Application\Services\Factory;

use Zend\ServiceManager\FactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class AuthenticationFactory implements FactoryInterface
{
    public function createService(ServiceLocatorInterface $serviceLocator)
    {
    	return $serviceLocator->get('doctrine.authenticationservice.orm_default');
    }
}
