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
		
	//	$eindex = $this->getIndex();
	//	$this->setType($type);
		//$etype = $this->getIndex()->getType($type);
		
		$edocument = new \Elastica\Document($document->getId(), $document->toIndexable());
		$this->getIndex()->getType($type)->addDocument($edocument);
		$this->getIndex()->refresh();
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
		
		return $this->index;
	}
	
	public function setIndex($index)
	{
		$this->index = $index;
		return $this;
	}
}