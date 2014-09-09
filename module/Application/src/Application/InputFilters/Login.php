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
                'name' => 'password',
                'required' => true,
            	/*'validators' => array(
        			array(
        				'name' => 'StringLength',
        				'options' => array(
        					'min' => 8,
        					'max' => 32,
        					'encoding' => 'UTF-8'
        				)
                	)
            	),*/
            	'filters'  => array(
            		array('name' => 'StripTags'),
            		array('name' => 'StringTrim'),
            	),
            ));
    }

}