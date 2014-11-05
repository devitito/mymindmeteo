<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;
use Elastica\Query;
use Elastica\Query\Match;

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
		
		if (isset($options['filter']) && (!empty($options['filter'])))
		{
			return $this->doQueryWithFilter($options['filter']);
		}
		else 
		{
			$elasticaQueryString  = new \Elastica\Query\MatchAll();
			
			// Create the actual search object with some data.
			$elasticaQuery        = new \Elastica\Query();
			$elasticaQuery->setQuery($elasticaQueryString);
			
			return $elasticaQuery;
		}
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
	
	protected function doQueryWithFilter($filters)
	{
		$elasticaQuery        = new \Elastica\Query();
		
		$multiMatch = new \Elastica\Query\MultiMatch();
		$filterArray = explode('+', $filters);
		$str = '';
		foreach($filterArray as $filter) {
			if (strlen($str) == 0)
				$str = $filter;
			else
				$str .= ' AND ' . $filter;
		}
		$multiMatch->setQuery($str);
		$multiMatch->setFields(['label', 'meteologist', 'topic', 'status']);
		
		$queryMatch = new \Elastica\Query\Match();
		$queryMatch->setField('samples.label', $str);
		
		$queryNested = new \Elastica\Query\Nested();
		$queryNested->setPath('samples');
		$queryNested->setQuery($queryMatch);
		
		$queryBool = new \Elastica\Query\Bool();
		$queryBool->addShould($multiMatch);
		$queryBool->addShould($queryNested);
		
		$elasticaQuery->setQuery($queryBool);
		return $elasticaQuery;
	}
}