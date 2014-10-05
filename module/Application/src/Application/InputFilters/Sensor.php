<?php

namespace Application\InputFilters;

use Zend\InputFilter\InputFilter;
use Zend\Db\Adapter\Adapter;

class Sensor extends InputFilter
{
	/**
	 * @var Database Adapter
	 */
	protected $dbAdapter;
	
    public function __construct(Adapter $dbAdapter)
    {
    	$this->dbAdapter = $dbAdapter;
    	
    	$this->add(
    		array(
    			'name' => 'label',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => 'StringLength',
    					'options' => array(
    						'max' => 128,
    						'encoding' => 'UTF-8'
    				)
    			),
    			array(
					'name' => 'Db\NoRecordExists',
    				'options' => array (
    					'table' => 'sensors',
    					'field' => 'label',
    					'adapter' => $this->getDbAdapter(),
    					'messages' => array(
    						\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'This sensor already exist'
    					)
    				)
    			),
    			array(
    				'name' => 'NotEmpty',
    				'options' => array(
        					'type' => array(\Zend\Validator\NotEmpty::STRING, \Zend\Validator\NotEmpty::NULL),
        					'messages' => [\Zend\Validator\NotEmpty::IS_EMPTY => 'A sensor test is required',
        									\Zend\Validator\NotEmpty::INVALID => 'A sensor test is required']
        				)
    			)
    		),
    		'filters'  => array(
    			array('name' => 'StripTags'),
    			array('name' => 'StringTrim'),
    		),
    	));
    	
    	$this->add(
    		array(
    			'name' => 'topic',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => 'InArray',
    					'options' => array(
    						'haystack' => array('love', 'health', 'money'),
    						'messages' => [\Zend\Validator\InArray::NOT_IN_ARRAY => 'Unknown sensor topic']
    					)
    				),
    				array(
    					'name' => 'NotEmpty',
    					'options' => array(
    						'type' => array(\Zend\Validator\NotEmpty::STRING, \Zend\Validator\NotEmpty::NULL),
        					'messages' => [\Zend\Validator\NotEmpty::IS_EMPTY => 'A sensor topic is required',
        									\Zend\Validator\NotEmpty::INVALID => 'A sensor topic is required']
    					)
    				)
    			),
    			'filters'  => array(
    				array('name' => 'StripTags'),
    				array('name' => 'StringTrim'),
    			),
    		));
    	
    	$this->add(
    		array(
    			'name' => 'answerPositive',
    			'required' => true,
    			'validators' => array(
    				 array(
    			 		'name' => 'StringLength',
    			 		'options' => array(
    		 				'min' => 1,
    		 				'max' => 32,
    		 				'encoding' => 'UTF-8'
    			 		)
    				 )
    			),
    			'filters'  => array(
    				array('name' => 'StripTags'),
    				array('name' => 'StringTrim'),
    			),
    	));
    	
    	$this->add(
    		array(
    			'name' => 'answerNegative',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => 'StringLength',
    					'options' => array(
    						'min' => 1,
    						'max' => 32,
    						'encoding' => 'UTF-8'
    					)
    				)
    			),
    			'filters'  => array(
    				array('name' => 'StripTags'),
    				array('name' => 'StringTrim'),
    			),
    		));
    	
    	$this->add(
    		array(
    			'name' => 'answerPositiveValue',
    			'required' => true,
    			'validators' => array(
	    			array('name' => '\Zend\I18n\Validator\Int'),
	    			array(
		    			'name' => 'Between',
		    			'options' => array(
		    				'min' => -10,
		    				'max' => 10
		    			)
	    			),
    			),
    			'filters'  => array(
    				array('name' => 'Int'),
    			),
    		));
    	
    	$this->add(
    		array(
    			'name' => 'answerNegativeValue',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => '\Application\Services\Validator\NotIdentical',
    					'options' => array(
    						'token' => 'answerPositiveValue',
    						'strict' => false,
    							'messages' => [\Application\Services\Validator\NotIdentical::SAME => 'The negative and positive samples cannot have the same values']
    						)
    					),
    					array('name' => '\Zend\I18n\Validator\Int'),
    					array(
	    					'name' => 'Between',
	    					'options' => array(
	    						'min' => -10,
	    						'max' => 10
	    						)
    					),
    			),
    			'filters'  => array(
    				array('name' => 'Int'),
    			),
    		));
    }
    
    /**
     *
     * @return Zend\Db\Adapter
     */
    public function getDbAdapter() 
    {
    	return $this->dbAdapter;
    }

}