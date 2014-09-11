<?php

namespace Application\Services\MindManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Entity\Mind;
use Application\Models\DbTable\MindTable;


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
	
	
	public function save(Mind $mind)
	{
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
			foreach ($options as $key => $value) {
				switch (strtolower($key)) {
					case 'id':
						return !$this->getMindTable()->existMind(['id' => $value]);
						break;
					case 'name':
						return !$this->getMindTable()->existMind(['name' => $value]);
						break;
					case 'email':
						return !$this->getMindTable()->existMind(['email' => $value]);
						break;
				}
			}
		}
	}
	
	public function getMindTable()
	{
		if (! $this->mindTable) {
			$this->mindTable = $this->getServiceManager()->get( 'Application\Models\DbTable\MindTable' );
		}
		return $this->mindTable;
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