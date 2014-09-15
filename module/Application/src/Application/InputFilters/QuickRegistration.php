<?php

namespace Application\InputFilters;

use Zend\InputFilter\InputFilter;
use Zend\Db\Adapter\Adapter;

class QuickRegistration extends InputFilter
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
    			'name' => 'name',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => 'StringLength',
    					'options' => array(
    						'max' => 10,
    						'encoding' => 'UTF-8'
    				)
    			),
    			array (
    				'name' => 'Regex',
    				'options' => array(
    					'pattern' => '/^[a-zA-Z0-9-]+$/i',
    					'messages' => array(
    						\Zend\Validator\Regex::INVALID => "The mind name can consist of alphanumerical characters and dash only",
    						\Zend\Validator\Regex::NOT_MATCH => "The mind name can consist of alphanumerical characters and dash only",
    						\Zend\Validator\Regex::ERROROUS => "The mind name can consist of alphanumerical characters and dash only",
    					)
    				)
    			),
    			array(
					'name' => 'Db\NoRecordExists',
    				'options' => array (
    					'table' => 'minds',
    					'field' => 'name',
    					'adapter' => $this->getDbAdapter(),
    					'messages' => array(
    						\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified name already exists in database'
    					)
    				)
    			),
    			array(
    				'name' => 'NotEmpty',
    				'options' => array(
        					'type' => array(\Zend\Validator\NotEmpty::STRING, \Zend\Validator\NotEmpty::NULL),
        					'messages' => [\Zend\Validator\NotEmpty::IS_EMPTY => 'A mind name is required',
        									\Zend\Validator\NotEmpty::INVALID => 'A mind name is required']
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
    			'name' => 'email',
    			'required' => true,
    			'validators' => array(
    				array(
    					'name' => 'StringLength',
    					'options' => array(
    						'max' => 32,
    						'encoding' => 'UTF-8'
    						)
    					),
    				array (
    					'name' => 'EmailAddress'
    					),
    				array(
    					'name' => 'Db\NoRecordExists',
    					'options' => array (
    						'table' => 'minds',
    						'field' => 'email',
    						'adapter' => $this->getDbAdapter(),
    						'messages' => array(
    							\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified email already exists in database'
    						)
    					)
    				),
    				array(
    					'name' => 'NotEmpty',
    					'options' => array(
    						'type' => \Zend\Validator\NotEmpty::STRING
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
    			'name' => 'password',
    			'required' => true,
    			'validators' => array(
    				 array(
    			 		'name' => 'StringLength',
    			 		'options' => array(
    		 				'min' => 8,
    		 				'max' => 12,
    		 				'encoding' => 'UTF-8'
    			 		)
    				 )
    			),
    			'filters'  => array(
    				array('name' => 'StripTags'),
    				array('name' => 'StringTrim'),
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