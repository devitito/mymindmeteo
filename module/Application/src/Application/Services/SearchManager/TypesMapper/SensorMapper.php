<?php

namespace Application\Services\SearchManager\TypesMapper;

use Application\Services\SearchManager\TypesMapperInterface;
use Elastica\Type\Mapping;

class SensorMapper implements TypesMapperInterface
{
	public function setProperties(Mapping $mapping)
	{
		// Set mapping
		$mapping->setProperties(array(
			'id'    => array('type' => 'string', 'include_in_all' => FALSE),
			'topic'	=> array('type' => 'string', 'include_in_all' => TRUE),
			'label' => array('type' => 'string', 'include_in_all' => TRUE),
			'tstamp'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE),
			'meteologist'  => array('type' => 'string', 'include_in_all' => TRUE),
		));
			
		// Send mapping to type
		$mapping->send();
	}
}