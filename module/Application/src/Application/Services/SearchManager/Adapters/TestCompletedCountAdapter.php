<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;

class TestCompletedCountAdapter implements SearchAdapterInterface
{
	public function getSearchOptions()
	{
		return null;
	}
	
	public function getSearchTypes()
	{
		return ['records'];
	}
	
	public function query($options = null)
	{
		$elasticaQueryString  = new \Elastica\Query\Match();
		$elasticaQueryString->setField('name', $options);
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->setQuery($elasticaQueryString);
		
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		return $resultSet->getTotalHits();
	}
}