<?php

namespace Application\InputFilters;

use Zend\InputFilter\InputFilter;

class AdminMindSave extends InputFilter
{
	
    public function __construct()
    {
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
    			'name' => 'role',
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
    					'name' => 'InArray',
    					'options' => array(
    						'haystack' => array('guest', 'demo', 'mind', 'meteologist', 'validator', 'admin'),
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
    			'name' => 'locale',
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
    						'name' => 'InArray',
    						'options' => array(
    							'haystack' => array('fr_FR', 'en_EN', 'es_ES', 'pl_PL', 'fi_FI'),
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
    	
    }
}