<?php

namespace Application\Services\SearchManager;

use Zend\ServiceManager\ServiceManager;
use Zend\ServiceManager\ServiceManagerAwareInterface;
use Application\Exception;
use Elastica\Index;
use Elastica\Type;
use Application\Entity\IndexableInterface;
use Application\Entity\Mind;
use Zend\Session\Container;

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

	public function clearAll()
	{
		$this->getIndex()->delete();
	}
	
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
	
	public function fetchMeteoChartData(Mind $mind)
	{ 
		$query = $this->buildMeteoChartQuery($mind->getName());
		
		//Search on the index.
		$resultset    = $this->getIndex()->search($query, ['search_type' => 'count']);
		$response = $resultset->getResponse();
		return $this->parseMeteoChartResponse($response, $mind);
	}
	
	private function buildMeteoChartQuery($name)
	{
		$elasticaQueryString  = new \Elastica\Query\Match();
		$elasticaQueryString->setField('name', $name);
		
		$meteo_over_time_agg = new \Elastica\Aggregation\DateHistogram('meteo_over_time', 'tstamp', 'day');
		$meteo_over_time_agg->setFormat('yyyy-MM-dd');
		
		$value_agg = new \Elastica\Aggregation\Avg('avg_value');
		$value_agg->setField('value');
		
		$topic_agg = new \Elastica\Aggregation\Terms("term_topic");
		$topic_agg->setField('topic');
		$topic_agg->addAggregation($value_agg);
		
		$meteo_over_time_agg->addAggregation($topic_agg);
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->setQuery($elasticaQueryString);
		$elasticaQuery->addAggregation($meteo_over_time_agg);
		
		return $elasticaQuery;
	}
	
	private function parseMeteoChartResponse($response, Mind $mind)
	{
		$data = $response->getData();
		$buckets = $data['aggregations']['meteo_over_time']['buckets'];
		
		$chart = [];
		$sunny = 0;
		$rainy = 0;
		foreach ($buckets as $bucket) {
			$days = $bucket['key_as_string'];
			$love = 0;
			$money = 0;
			$health = 0;
				
			$topics = $bucket['term_topic']['buckets'];
			foreach ($topics as $topic) {
				if ($topic['key'] == 'love')
					$love = round($topic['avg_value']['value'], 1);
				if ($topic['key'] == 'money')
					$money = round($topic['avg_value']['value'], 1);
				if ($topic['key'] == 'health')
					$health = round($topic['avg_value']['value'], 1);
			}

			$mood = round(($love+$money+$health)/3, 1);
			if ($mood > 0)
				$sunny++;
			else
				$rainy++;
			
			$chart[] = ['days' => $days, 'love' => $love, 'money' => $money, 'health' => $health, 'mood' => $mood];
		}
		
		$sessionMind = new Container('mind');
		$sessionMind->sunny = $sunny;
		$sessionMind->rainy = $rainy;
		return $chart;
	}
	
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
	
	protected function setMapping($type, &$mapping)
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
	
	private function setRecordMapping(&$mapping)
	{
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
	
	private function setSensorMapping(&$mapping)
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