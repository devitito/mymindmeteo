<?php

namespace Application\Services\SearchManager\TypesMapper;

use Application\Services\SearchManager\TypesMapperInterface;
use Elastica\Type\Mapping;

class RecordMapper implements TypesMapperInterface
{
	public function setProperties(Mapping $mapping)
	{
		// Set mapping
		$mapping->setProperties(array(
				'id'    => array('type' => 'string', 'include_in_all' => FALSE),
				'topic'	=> array('type' => 'string', 'include_in_all' => TRUE),
				'sample'     => array('type' => 'string', 'include_in_all' => TRUE),
				'value'	=> array('type' => 'integer', 'include_in_all' => TRUE),
				'tstamp'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE),
				'day' => array('type' => 'integer', 'include_in_all' => TRUE),
				'hour' => array('type' => 'integer', 'include_in_all' => TRUE),
				'timezone'  => array('type' => 'string', 'include_in_all' => TRUE),
				'location'  => array('type' => 'geo_point', 'include_in_all' => TRUE),
				'mind'  => array(
						'type' => 'object',
						'properties' => array(
								'name'   => array('type' => 'string', 'include_in_all' => TRUE),
								'email'  => array('type' => 'string', 'include_in_all' => TRUE),
								'joindate'  => array('type' => 'date', "format" => "yyyy-MM-dd HH:mm:ss", 'include_in_all' => TRUE)
						),
				),
				'sensor'  => array(
						'type' => 'object',
						'properties' => array(
								'label'   		=> array('type' => 'string', 'include_in_all' => TRUE),
								'meteologist'  	=> array('type' => 'string', 'include_in_all' => TRUE),
						),
				),
		));
			
		// Send mapping to type
		$mapping->send();
	}
}