<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;
use Elastica\Query;
use Elastica\Query\Match;

class SensorGetAdapter implements SearchAdapterInterface
{
	public function getSearchOptions()
	{
		return null;
	}
	
	public function getSearchTypes()
	{
		return ['sensors'];
	}
	
	public function query($options = null)
	{
		$match  = new \Elastica\Query\Match();
		$match->setField('id', $options['id']);
			
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->setQuery($match);
			
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		$results = $resultSet->getResults();
		
		
		$source = $results['0']->getSource();
		return ['id' => $source['id'],
				'label' => $source['label'], 
				'samples' => $source['samples'], 
				'topic' => $source['topic'], 	
				'meteologist' => $source['meteologist'], 
				'status' => 'approved'];
	}
}