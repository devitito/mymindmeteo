<?php

namespace Application\Services\MindManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Entity\Mind;
use Application\Exception;
use Traversable;
use Zend\Stdlib\ArrayUtils;
use Zend\Crypt\Password\Bcrypt;
use DateTime;

class MindManager implements ServiceManagerAwareInterface
{
	/**
	 * 
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;

	/**
	 * @var Doctrine\ORM\EntityManager
	 */
	protected $entityManager;
	
	public function save($mind)
	{
		if (!$mind instanceof Mind) {
			throw Exception::factory(Exception::OPERATION_FAILED);
		}

		$bcrypt = new Bcrypt();
		//Set id, Encrypt password and add join date
		if (!$mind->getId()) {
			$mind->setId(uniqid());
			$mind->setPassword($bcrypt->create($mind->getPassword()));
			$mind->setJoindate(new DateTime("now"));
			$mind->setRole('mind');
		}
		
		try {
			$this->getEntityManager()->persist($mind);
			$this->getEntityManager()->flush();
		} catch (\Exception $e) {
			throw Exception::factory(Exception::OPERATION_FAILED);
		}
		
		return $mind;
	}
	
	public function isAvailable($options)
	{
		if (empty($options)) 
			throw new \InvalidArgumentException('The options parameter must not be empty');
		else 
		{
			if ($options instanceof Traversable) {
				$options = ArrayUtils::iteratorToArray($options);
			} elseif (!is_array($options)) {
				throw new \InvalidArgumentException('The options parameter must be an array or a Traversable');
			}
			
			//reserved mind name
			$reserved = ['admin', 'Admin', 'demo', 'Demo'];
			if (array_key_exists('name', $options)) {
				if (in_array($options['name'], $reserved))
					return false;
			}
			
			try {
				return (empty($this->getEntityManager()->getRepository('Application\Entity\Mind')->findBy($options)));
			}
			catch (\Exception $e) {
				throw Exception::factory(Exception::UNKNOWN_MIND);
			}
			
		}
	}
	
	/**
	 * Static function for checking hashed password (as required by Doctrine)
	 *
	 * @param Application\Entity\Mind $mind The identity object
	 * @param string $passwordGiven Password provided to be verified
	 * @return boolean true if the password was correct, else, returns false
	 */
	public static function verifyHashedPassword(Mind $mind, $passwordGiven)
	{
		return (new Bcrypt())->verify($passwordGiven, $mind->getPassword());
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
	
	/**
	 * get entityManager
	 *
	 * @return EntityManager
	 */
	private function getEntityManager()
	{
		if (null === $this->entityManager) {
			$this->entityManager = $this->getServiceManager()->get('doctrine.entitymanager.orm_default');
		}
	
		return $this->entityManager;
	}
}