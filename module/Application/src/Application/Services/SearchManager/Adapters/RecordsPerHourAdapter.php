<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;

class RecordsPerHourAdapter implements SearchAdapterInterface
{
	public function getSearchOptions()
	{
		return ['search_type' => 'count'];
	}
	
	public function getSearchTypes()
	{
		return ['records'];
	}
	
	public function query($options = null)
	{
		$records_by_hour = new \Elastica\Aggregation\Terms('records_by_hour');
		$records_by_hour->setField('hour');
		$records_by_hour->setOrder('_term', 'asc');
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->addAggregation($records_by_hour);
		
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		$records_by_hour_agg = $resultSet->getAggregation('records_by_hour');
		$buckets = $records_by_hour_agg['buckets'];
		
		$data = [];
		foreach($buckets as $bucket)
			$data[$bucket['key']] = $bucket['doc_count'];
			
		return $data;
	}
}