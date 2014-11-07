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
		
		$edocument = new \Elastica\Document($document->getId(), $document->toIndexable($this->getServiceManager()));
		$this->getIndex()->getType($type)->addDocument($edocument);
		$this->getIndex()->refresh();
	}
	
	/**
	 * Delete a document of type $type from the index
	 * 
	 * @param string $type
	 * @param IndexableInterface $document
	 */
	public function delete($type, IndexableInterface $document)
	{
		$type = (string) $type;
		if (!in_array($type, $this->types))
			throw Exception::factory(Exception::UNKNOWN_TYPE);
		
		$edocument = $this->getIndex()->getType($type)->getDocument($document->getId());
		$this->getIndex()->getType($type)->deleteDocument($edocument);
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
			throw Exception::factory(Exception::REQUEST_FAILED);
		
		$searchObject = new \Elastica\Search($this->getElastica());
		$searchObject->addIndex('mindmeteo');
		
		$searchTypes = $adapter->getSearchTypes();
		foreach($searchTypes as $type)
			$searchObject->addType($type);
		
		try {
			$resultSet = $searchObject->search($adapter->query($options), $adapter->getSearchOptions());
			return $adapter->parse($resultSet);
		} catch (\Exception $e) {
			return [$e->getMessage()];
		}
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
	
	/**
	 * Create the index if necessary and map types
	 * 
	 * @return Elastica\Index
	 */
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
	
	/**
	 * Call type's mapper to define the mapping
	 * 
	 * @param string $type the type to map
	 * @param \Elastica\Type\Mapping $mapping the mapping object
	 */
	protected function setMapping($type, $mapping)
	{
		if (!$this->getServiceManager()->has('type-'.$type.'-mapping'))
			return;
			
		$this->getServiceManager()->get('type-'.$type.'-mapping')->setProperties($mapping);
	}
}