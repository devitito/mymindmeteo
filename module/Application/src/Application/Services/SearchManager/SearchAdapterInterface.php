<?php

namespace Application\Services\SearchManager;

use Elastica\ResultSet;

interface SearchAdapterInterface
{
	/**
	 * Return the search options
	 * 
	 * @return array
	 */
	public function getSearchOptions();
	
	/**
	 * Return the types used in the request
	 * 
	 * @return array
	 */
	public function getSearchTypes();
	
	/**
	 * Assemble the query
	 * 
	 * @param string $options
	 * @return Elastica\Query
	 */
	public function query($options = null);
	
	/**
	 * 
	 * Parse the resutSet and generated the returned array
	 * 
	 * @param ResultSet $resultSet
	 * @return array
	 */
	public function parse(ResultSet $resultSet);
}