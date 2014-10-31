<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;
use Application\Entity\Mind;
use Application\Exception;
use Zend\Session\Container;

class MeteoChartAdapter implements SearchAdapterInterface
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
		if (!$options instanceOf Mind)
			throw Exception::factory(Exception::REQUEST_FAILED);
			
		$elasticaQueryString  = new \Elastica\Query\Match();
		$elasticaQueryString->setField('name', $options->getName());
		
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
	
	public function parse(ResultSet $resultSet)
	{
		$meteo_over_time_agg = $resultSet->getAggregation('meteo_over_time');
		$buckets = $meteo_over_time_agg['buckets'];
		
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
}