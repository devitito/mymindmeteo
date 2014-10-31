<?php

namespace Application\Services\SearchManager;

use Elastica\ResultSet;

interface SearchAdapterInterface
{
	public function getSearchOptions();
	
	public function getSearchTypes();
	
	public function query($options = null);
	
	public function parse(ResultSet $resultSet);
}