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
		
		try {
			if (!$mind->getId())
				$mind = $this->create($mind);
			else
				$mind = $this->update($mind);
			
			$this->getEntityManager()->flush();
		} catch (\Exception $e) {
			throw Exception::factory(Exception::OPERATION_FAILED);
		}
		
		return $mind;
	}
	
	/**
	 * Set id, Encrypt password, add join date and set role if the mind is not create by admin
	 * 
	 * @param Mind $mind
	 * @return Mind
	 */
	protected function create(Mind $mind)
	{
		$bcrypt = new Bcrypt();
		$mind->setId(uniqid());
		$mind->setPassword($bcrypt->create($mind->getPassword()));
		$mind->setJoindate(new DateTime("now"));
		$this->getEntityManager()->persist($mind);
		//admin create minds with role but when a new mind register he doesn't have a role yet, by default he is mind
		if (!$mind->getRole())
			$mind->setRole('mind');
		
		return $mind;
	}
	
	protected function update(Mind $update)
	{
		//compare with existing one
		$existing = $this->getEntityManager()->getRepository('Application\Entity\Mind')->find($update->getId());
		
		if ($update->getEmail() != $existing->getEmail())
			$existing->setEmail($update->getEmail());
		
		if ($update->getRole() != $existing->getRole())
			$existing->setRole($update->getRole());
		
		if ($update->getLocale() != $existing->getLocale())
			$existing->setLocale($update->getLocale());
		
		if ($update->getTimezone() != $existing->getTimezone())
			$existing->setTimezone($update->getTimezone());
		
		return $existing;
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
	
	public function isValid(array $data)
	{
		$filters = new \Application\InputFilters\AdminMindSave();
			
		if (array_key_exists('id', $data)) {
			//exclude the current mind email in the search
			$options = array (
					'table' => 'minds',
					'field' => 'email',
					'adapter' => $this->getServiceManager()->get('Zend\Db\Adapter\Adapter'),
					'messages' => array(
							\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified email already exists in database'
					),
					'exclude' =>  array(
							'field' => 'id',
							'value' => $data['id']
					)
			);
			$validator = new \Zend\Validator\Db\NoRecordExists($options);
			$filters->get('email')->getValidatorChain()->attach($validator);
				
			$options = array (
					'table' => 'minds',
					'field' => 'name',
					'adapter' => $this->getServiceManager()->get('Zend\Db\Adapter\Adapter'),
					'messages' => array(
							\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified name already exists in database'
					),
					'exclude' =>  array(
							'field' => 'id',
							'value' => $data['id']
					)
			);
			$validator = new \Zend\Validator\Db\NoRecordExists($options);
			$filters->get('name')->getValidatorChain()->attach($validator);
		}
		
		$isValid = $filters->setData($data)->isValid();
		return ['result' => $isValid, 'messages' => $filters->getMessages()];
	}
	
	public function fetchAll()
	{
		try {
			return $this->getEntityManager()->getRepository('Application\Entity\Mind')->findAll();
		} catch (\Exception $e) {
				throw Exception::factory(Exception::OPERATION_FAILED);
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