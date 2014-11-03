<?php

namespace Application\Services\SearchManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Exception;
use Elastica\Index;
use Elastica\Type;
use Application\Entity\IndexableInterface;
use Application\Entity\Mind;

class SearchManager implements ServiceManagerAwareInterface
{
	protected $elastica;
	
	protected $types = ['records', 'sensors', 'minds'];
	
	protected $index;
	
	protected $type;
	
	/**
	 * 
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;

	/**
	 * Clear all indexes
	 * 
	 */
	public function clearAll()
	{
		$this->getIndex()->delete();
	}
	
	/**
	 * Index a document with the given type
	 * 
	 * @param string $type
	 * @param IndexableInterface $document
	 */
	public function index($type, IndexableInterface $document)
	{
		$type = (string) $type;
		if (!in_array($type, $this->types))
			throw Exception::factory(Exception::UNKNOWN_TYPE);	
		
		$edocument = new \Elastica\Document($document->getId(), $document->toIndexable());
		$this->getIndex()->getType($type)->addDocument($edocument);
		$this->getIndex()->refresh();
	}
	
	/**
	 * Issue a request in elasticsearch
	 * 
	 * @param string $request the name of the service
	 * @param string|array $options
	 */
	public function request($request, $options = null)
	{
		$adapter = $this->getAdapter($request);
		if (!$adapter)
			throw Exception::factory(Exception::UNKNOWN_REQUEST);
		
		$searchObject = new \Elastica\Search($this->getElastica());
		$searchObject->addIndex('mindmeteo');
		
		$searchTypes = $adapter->getSearchTypes();
		foreach($searchTypes as $type)
			$searchObject->addType($type);
		
		$resultSet = $searchObject->search($adapter->query($options), $adapter->getSearchOptions());
		return $adapter->parse($resultSet);
	}
	
	/**
	 * Fetch the adapater if any
	 * 
	 * @param string $request the name of the service
	 * @return the service or null
	 */
	public function getAdapter($request)
	{
		if (!$this->getServiceManager()->has($request))
			return null;
			
		return $this->getServiceManager()->get($request);
	}
	
	/**
	 * Return the supported types
	 * 
	 * @return multitype:string
	 */
	public function getTypes()
	{
		return $this->types;
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
	
	public function getElastica()
	{
		if (!$this->elastica)
			$this->elastica = $this->getServiceManager()->get('elastica');
		
		return $this->elastica;
	}
	
	public function getIndex()
	{
		if(!$this->index)
			$this->index = $this->getElastica()->getIndex('mindmeteo');
		
		if (!$this->index->exists())
		{
			$this->index->create();
			
			foreach($this->getTypes() as $type) {
				$recordType = $this->index->getType($type);
				// Define mapping
				$mapping = new \Elastica\Type\Mapping();
				$mapping->setType($recordType);
				$this->setMapping($type, $mapping);
			}
		}
			
		return $this->index;
	}
	
	public function setIndex($index)
	{
		$this->index = $index;
		return $this;
	}
	
	protected function setMapping($type, $mapping)
	{
		switch ($type) {
			case 'records':
				$this->setRecordMapping($mapping);
				break;
				
			case 'sensors':
				$this->setSensorMapping($mapping);
				break;
				
			default:
				break;
		};
	}
	
	private function setRecordMapping($mapping)
	{
		// Set mapping
		$mapping->setProperties(array(
				'id'    => array('type' => 'string', 'include_in_all' => FALSE),
				'topic'	=> array('type' => 'string', 'include_in_all' => TRUE),
				'sample'     => array('type' => 'string', 'include_in_all' => TRUE),
				'value'	=> array('type' => 'integer', 'include_in_all' => TRUE),
				'tstamp'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE),
				'day' => array('type' => 'string', 'include_in_all' => TRUE),
				'hour' => array('type' => 'integer', 'include_in_all' => TRUE),
				'timezone'  => array('type' => 'string', 'include_in_all' => TRUE),
				'location'  => array('type' => 'geo_point', 'include_in_all' => TRUE),
				'mind'  => array(
						'type' => 'object',
						'properties' => array(
								'name'   => array('type' => 'string', 'include_in_all' => TRUE),
								'email'  => array('type' => 'string', 'include_in_all' => TRUE),
								'joindate'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE)
						),
				),
				'sensor'  => array(
						'type' => 'object',
						'properties' => array(
								'label'   		=> array('type' => 'string', 'include_in_all' => TRUE),
								'meteologist'  	=> array('type' => 'string', 'include_in_all' => TRUE),
						),
				),
		));
			
		// Send mapping to type
		$mapping->send();
	}
	
	private function setSensorMapping($mapping)
	{
		// Set mapping
		$mapping->setProperties(array(
			'id'    => array('type' => 'string', 'include_in_all' => FALSE),
			'topic'	=> array('type' => 'string', 'include_in_all' => TRUE),
			'label' => array('type' => 'string', 'include_in_all' => TRUE),
			'tstamp'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE),
			'meteologist'  => array('type' => 'string', 'include_in_all' => TRUE),
		));
			
		// Send mapping to type
		$mapping->send();
	}
}