<?php

namespace Application\Forms;

use Zend\Form\Form;

class Sensor extends Form
{
    public function init()
    {
    	//$this->setAttribute('method', 'post');
    	$this->setAttribute('accept-charset', 'UTF-8');
    	$this->setAttribute('id', 'sensor');
    	$this->setAttribute('class', 'sensor');
    	$this->setAttribute('name', 'sensor');
    	//$this->setAttribute('action', 'add-sensor-and-samples');
    	
        $this->add(
            array(
                'name' => 'label',
                'attributes' => array(
                    'type' => 'textarea',
                    'class' => 'form-control input-lg',
                    'placeholder' => 'Enter here text of your sensor'
                ),
            )
        );
        
        $this->add(
            array(
                'name' => 'topic',
            	'type' => 'Zend\Form\Element\Select',
                'attributes' => array(
                	'id' => 'topic',
                    'class' => 'form-control input-lg',
                	'options' => array('unpicked' => 'Pick a topic', 'love' => 'Love', 'health' => 'Health', 'money' => 'Money')
                ),
            )
        );
        
        $this->add(
        		array(
        				'name' => 'answerPositive',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'form-control input-lg',
        						'style' => "width: 200px; margin-right:10px; margin-left:0px;",
        						'placeholder' => 'Label'
        				),
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'answerPositiveValue',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'slider slider-horizontal',
        						'style' => "width: 140px; margin-right:10px; margin-left:10px;",
        						'data-slider-min' => "-10",
        						'data-slider-max' => "10",
        						'data-slider-step' => "1",
        						'data-slider-value' => "3",
        						'value' => "3" //default value 
        				),
        		)
        );
        
        //@todo image upload
        
        $this->add(
        		array(
        				'name' => 'answerNegative',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'form-control input-lg',
        						'style' => "width: 200px; margin-right:10px; margin-left:0px;",
        						'placeholder' => 'Label'
        				),
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'answerNegativeValue',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'slider slider-horizontal',
        						'style' => "width: 140px; margin-right:10px; margin-left:10px;",
        						'data-slider-min' => "-10",
        						'data-slider-max' => "10",
        						'data-slider-step' => "1",
        						'data-slider-value' => "-3",
        						'value' => "-3" //default value
        				),
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'submitsensor',
        				'attributes' => array(
        						'class' => 'btn btn-meteo',
        						'type' => 'submit',
        						'value' => 'Send',
        						'id' => 'submitsensor',
        				)
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'dismiss',
        				'attributes' => array(
        						'class' => 'btn btn-default',
        						'type' => 'button',
        						'value' => 'Close',
        						'data-dismiss' => 'modal'
        				)
        		)
        );
    }

}