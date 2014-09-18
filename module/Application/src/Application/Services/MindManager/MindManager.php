<?php

namespace Application\Services\MindManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Entity\Mind;
use Application\Models\DbTable\MindTable;
use Application\Exception;
use Traversable;
use Zend\Stdlib\ArrayUtils;


class MindManager implements ServiceManagerAwareInterface
{
	/**
	 * 
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;

	/**
	 *
	 * @var Application\Models\DbTable\MindTable
	 */
	protected $mindTable;	
	
	
	public function save($mind)
	{
		if (!$mind instanceof Mind) {
			throw Exception::factory(Exception::OPERATION_FAILED);
		}
		$mindModel = new \Application\Models\Mind;
		$mindModel->exchangeArray($mind);

		$this->getMindTable()->saveMind($mindModel);
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
			
			foreach ($options as $key => $value) {
				switch (strtolower($key)) {
					case 'id':
						return !$this->getMindTable()->existMind(['id' => $value]);
						break;
					case 'name':
						if (in_array($value, $reserved))
							return false;
						return !$this->getMindTable()->existMind(['name' => $value]);
						break;
					case 'email':
						return !$this->getMindTable()->existMind(['email' => $value]);
						break;
				}
			}
			throw Exception::factory(Exception::UNKNOWN_MIND);
		}
	}
	
	public function getMind($mind)
	{
		if (!is_array($mind)) {
			throw Exception::factory(Exception::UNKNOWN_MIND);
		} 
		
		if (array_key_exists('id', $mind))
			return $this->getMindTable()->getMindById($mind['id']);
		if (array_key_exists('nameoremail', $mind))
			return $this->getMindTable()->getMindByNameoremail($mind['nameoremail']);
		if (array_key_exists('name', $mind))
			return $this->getMindTable()->getMindByNameoremail($mind['name']);
		if (array_key_exists('email', $mind))
			return $this->getMindTable()->getMindByNameoremail($mind['email']);
		
		//Throw exception if nothing could allow to identificate the mind
		throw Exception::factory(Exception::UNKNOWN_MIND);
	}
	
	public function getMindTable()
	{
		if (! $this->mindTable) {
			$this->mindTable = $this->getServiceManager()->get( 'Application\Models\DbTable\MindTable' );
		}
		return $this->mindTable;
	}
	
	public function setMindTable($mindTable)
	{
		$this->mindTable = $mindTable;
		return $this;
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