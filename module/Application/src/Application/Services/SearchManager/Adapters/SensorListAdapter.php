<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;

class SensorListAdapter implements SearchAdapterInterface
{
	private $count;
	private $page;
	
	public function getSearchOptions()
	{
		return [
			'from' => $this->page * $this->count,
			'size' => $this->count
		];
	}
	
	public function getSearchTypes()
	{
		return ['sensors'];
	}
	
	public function query($options = null)
	{
		$this->count = $options['count'];
		$this->page = $options['page'] - 1;
		
		$elasticaQueryString  = new \Elastica\Query\MatchAll();
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->setQuery($elasticaQueryString);
		
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		$results = $resultSet->getResults();
		
		$data = [];
		foreach($results as $result) {
			$source = $result->getSource();
			$data[] = [	'id' => $source['id'],
						'label' => $source['label'], 
						'samples' => $source['samples'], 
						'topic' => $source['topic'], 	
						'meteologist' => $source['meteologist'], 
						'status' => 'approved'];
		}
			
		return ['total' => $resultSet->getTotalHits(), 'result' => $data];
	}
}