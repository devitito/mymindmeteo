<?php

namespace Application\Services\SearchManager\Adapters;

use Application\Services\SearchManager\SearchAdapterInterface;
use Elastica\ResultSet;

class RecordsPerDayAdapter implements SearchAdapterInterface
{
	private $locale;
	
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
		$this->setlocale($options);
		$records_by_day = new \Elastica\Aggregation\Terms('records_by_day');
		$records_by_day->setField('day');
		$records_by_day->setOrder('_term', 'asc');
		
		// Create the actual search object with some data.
		$elasticaQuery        = new \Elastica\Query();
		$elasticaQuery->addAggregation($records_by_day);
		
		return $elasticaQuery;
	}
	
	public function parse(ResultSet $resultSet)
	{
		$records_by_day_agg = $resultSet->getAggregation('records_by_day');
		$buckets = $records_by_day_agg['buckets'];

		$mapping = [];
		switch ($this->getLocale()) {
			case 'fr_FR' :
				$mapping = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Sam'];
				break;
				
			case 'es_ES' :
				$mapping = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Sab'];
				break;
				
			case 'en_EN' :
			default:
				$mapping = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				break;
		};
		
		$data = [];
		foreach($buckets as $bucket) {
			$day = $mapping[$bucket['key']];
			$data[$day] = $bucket['doc_count'];
		}
			
		return $data;
	}
	
	private function getLocale()
	{
		return $this->locale;
	}
	
	private function setlocale($value)
	{
		$this->locale = $value;
		return $this;
	}
}