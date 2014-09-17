<?php 

namespace Application\Services\LoginManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Services\MindManager;
use Application\Entity\Mind;
use Zend\Crypt\Password\Bcrypt;
use Application\Exception;

class LoginManager implements ServiceManagerAwareInterface
{
	/**
	 *
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;
	
	public function checkCredentials($login)
	{
		if (!$login instanceof Mind && !is_array($login)) {
			throw Exception::factory(Exception::LOGIN_FAILED);
		} elseif ((!array_key_exists('nameoremail', $login)) || (!array_key_exists('password', $login)))
			throw Exception::factory(Exception::LOGIN_FAILED);
		
		$mindManager = $this->getServiceManager()->get('mind-manager');
		$row = $mindManager->getMind($login);
		if (!$row)
			return null;
		else {
			$bcrypt = new Bcrypt();
			if ($bcrypt->verify($login['password'], $row->password)) {
				$mind = $this->getServiceManager()->get('entity.mind');
				$mind->setName($row->name);
				$mind->setPassword($row->password);
				$mind->setEmail($row->email);
				$mind->setId($row->id);
				return $mind;
			}
			else
				return null;
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