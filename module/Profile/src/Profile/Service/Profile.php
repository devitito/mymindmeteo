<?php

namespace Profile\Service;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;

class Profile implements ServiceManagerAwareInterface
{
	/**
	 *
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;
	
	public function getAdminRole()
	{
		return 'admin';
	}
	
	/**
	 * Set service manager
	 *
	 * @param ServiceManager $serviceManager
	 */
	public function setServiceManager(ServiceManager $serviceManager)
	{
		$this->serviceManager = $serviceManager;
	}
	
	/**
	 *
	 * @return Zend\ServiceManager\ServiceManager
	 */
	public function getServiceManager()
	{
		return $this->serviceManager;
	}
}