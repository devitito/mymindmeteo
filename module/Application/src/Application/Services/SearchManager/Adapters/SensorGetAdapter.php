<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Application\Exception;
use Elastica\ResultSet;
use Elastica\Query;
use Elastica\Query\Match;
use Zend\I18n\View\Helper\DateFormat;
use IntlDateFormatter;

class SensorGetAdapter implements SearchAdapterInterface
{
	protected $locale = 'en_EN';
	
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
		if (!isset($options['id']))
			throw Exception::factory(Exception::DO_QUERY_FAILED);
		
		if (isset($options['identity'])) 
		{
			$identity = $options['identity'];
			$this->locale = $identity->getLocale();
		}
		
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
		
		if (count($results) == 0)
			throw Exception::factory(Exception::DO_PARSE_FAILED);
		
		$source = $results['0']->getSource();
		
		$createdOn = new \DateTime($source['tstamp']);
		$dateformat = new DateFormat();
		$date = $dateformat($createdOn, IntlDateFormatter::MEDIUM, IntlDateFormatter::MEDIUM, $this->locale);
		
		return ['id' => $source['id'],
				'createdOn' => $date,
				'label' => $source['label'], 
				'samples' => $source['samples'], 
				'topic' => $source['topic'], 	
				'meteologist' => $source['meteologist'], 
				'status' => $source['status']];
	}
}