<?php

namespace Application\Services\SearchManager;

use Elastica\Type\Mapping;

interface TypesMapperInterface
{
	/**
	 * Map the fields of the type
	 * 
	 */
	public function setProperties(Mapping $mapping);
}