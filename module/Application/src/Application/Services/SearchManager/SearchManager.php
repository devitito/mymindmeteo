<?php

namespace Application\Services\SearchManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Exception;
use Elastica\Index;
use Elastica\Type;
use Application\Entity\IndexableInterface;

class SearchManager implements ServiceManagerAwareInterface
{
	protected $elastica;
	
	protected $types = ['records'];
	
	protected $index;
	
	protected $type;
	
	/**
	 * 
	 * @var Zend\ServiceManager\ServiceManager
	 */
	protected $serviceManager;

	public function index($type, IndexableInterface $document)
	{
		$type = (string) $type;
		if (!in_array($type, $this->types))
			throw Exception::factory(Exception::UNKNOWN_TYPE);	
		
		$edocument = new \Elastica\Document($document->getId(), $document->toIndexable());
		$this->getIndex()->getType($type)->addDocument($edocument);
		$this->getIndex()->refresh();
	}
	
	public function getTestedSensorCount($name)
	{
		$elasticaQueryString  = new \Elastica\Query\Match();
		$elasticaQueryString->setField('name', $name);
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->setQuery($elasticaQueryString);
		
		//Search on the index.
		$elasticaResultSet    = $this->getIndex()->search($elasticaQuery);
		return $elasticaResultSet->getTotalHits();
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
			$elasticaType = $this->index->getType('records');
			
			// Define mapping
			$mapping = new \Elastica\Type\Mapping();
			$mapping->setType($elasticaType);
			
			// Set mapping
			$mapping->setProperties(array(
				'id'    => array('type' => 'string', 'include_in_all' => FALSE),
				'topic'	=> array('type' => 'string', 'include_in_all' => TRUE),
				'sample'     => array('type' => 'string', 'include_in_all' => TRUE),
				'value'	=> array('type' => 'integer', 'include_in_all' => TRUE),
				'tstamp'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE),
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
			
		return $this->index;
	}
	
	public function setIndex($index)
	{
		$this->index = $index;
		return $this;
	}
}