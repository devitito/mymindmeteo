<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;
use Elastica\Query;
use Elastica\Query\Match;
use Application\Exception;

class SensorSuggestAdapter implements SearchAdapterInterface
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
		if (isset($options['filter']) && (!empty($options['filter'])))
		{
			$elasticaQuery        = new \Elastica\Query();
			$flt = new \Elastica\Query\FuzzyLikeThis();
			
			$str = str_replace('+', ' ', $options['filter']);
			$flt->setLikeText($str);
			$flt->addFields(['label', 'meteologist', 'topic', 'status']);
			
			$elasticaQuery->setQuery($flt);
			return $elasticaQuery;
		}
		else
			throw Exception::factory(Exception::DO_QUERY_FAILED);
	}
	
	public function parse(ResultSet $resultSet)
	{
		$results = $resultSet->getResults();
		
		$data = [];
		foreach($results as $result) {
			$source = $result->getSource();
			$data[] = [	'id' => $source['id'],
						'label' => $source['label'], 
						'topic' => $source['topic']];
		}
			
		return $data;
	}
}