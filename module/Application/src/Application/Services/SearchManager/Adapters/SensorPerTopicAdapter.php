<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;

class SensorPerTopicAdapter implements SearchAdapterInterface
{
	public function getSearchOptions()
	{
		return ['search_type' => 'count'];
	}
	
	public function getSearchTypes()
	{
		return ['sensors'];
	}
	
	public function query($options = null)
	{
		$sensor_by_topic = new \Elastica\Aggregation\Terms('sensor_by_topic');
		$sensor_by_topic->setField('topic');
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->addAggregation($sensor_by_topic);
		
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		$sensor_by_topic_agg = $resultSet->getAggregation('sensor_by_topic');
		$buckets = $sensor_by_topic_agg['buckets'];
		
		$data = [];
		foreach($buckets as $bucket)
			$data[$bucket['key']] = $bucket['doc_count'];
			
		return $data;
	}
}