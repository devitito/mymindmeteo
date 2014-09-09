<?php 

namespace Application\Services\LoginManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Services\MindManager;
use Zend\Crypt\Password\Bcrypt;
use Application\Exception;

class LoginManager implements ServiceManagerAwareInterface
{
	/**
	 *
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;
	
	public function checkCredentials(array $login)
	{
		if (!array_key_exists('nameoremail', $login))
			throw Exception::factory(Exception::LOGIN_FAILED);
		
		$mindManager = $this->getServiceManager()->get('mind-manager');
		$row = $mindManager->getMindTable()->getMindByNameoremail($login['nameoremail']);
		if (!$row)
			return false;
		else {
			$bcrypt = new Bcrypt();
			if ($bcrypt->verify($login['password'], $row->password))
				return true;
			else
				return false;
		}
			
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