<?php

namespace Application\InputFilters;

use Zend\InputFilter\InputFilter;

class Login extends InputFilter
{

    public function __construct()
    {
        $this->add(
        	array(
        		'name' => 'nameoremail',
        		'required' => true,
        		//'continue_if_empty' => true,
        		'validators' => array(
        			array(
        				'name' => 'NotEmpty',
        				'options' => array(
        					'type' => array(\Zend\Validator\NotEmpty::STRING, \Zend\Validator\NotEmpty::NULL),
        					'messages' => [\Zend\Validator\NotEmpty::IS_EMPTY => 'A name or an email is required',
        									\Zend\Validator\NotEmpty::INVALID => 'A name or an email is required']
        				)
        			)
        		),
        		'filters'  => array(
        			array('name' => 'StripTags'),
        			array('name' => 'StringTrim'),
        		),
        	)
        );
        
        $this->add(
            array(
                'name' => 'password',
                'required' => true,
            	'validators' => array(
        			array(
        				'name' => 'NotEmpty',
        				'options' => array(
        					'type' => array(\Zend\Validator\NotEmpty::STRING, \Zend\Validator\NotEmpty::NULL),
        					'messages' => [\Zend\Validator\NotEmpty::IS_EMPTY => 'A password is required',
        									\Zend\Validator\NotEmpty::INVALID => 'A password is required']
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