<?php

namespace Application\Forms;

use Zend\Form\Form;

class Sensor extends Form
{
    public function init()
    {
    	$this->setAttribute('method', 'post');
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
                    'class' => 'form-control',
                    'placeholder' => 'Enter here text of your sensor'
                ),
                'options' => array(
                    'label' => 'Your sensor'
                )
            )
        );
        
        $this->add(
            array(
                'name' => 'topic',
                'attributes' => array(
                    'type' => 'text',
                    'class' => 'form-control input-lg',
                    'placeholder' => 'health, love or money'
                ),
                'options' => array(
                    'label' => 'The topic of your sensor'
                )
            )
        );
        
        $this->add(
        		array(
        				'name' => 'answerPositive',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'form-control input-lg',
        						'placeholder' => 'The positive sample'
        				),
        				'options' => array(
        						'label' => 'The description of the positive sample'
        				)
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'answerNegative',
        				'attributes' => array(
        						'type' => 'text',
        						'class' => 'form-control input-lg',
        						'placeholder' => 'The negative sample'
        				),
        				'options' => array(
        						'label' => 'The description of the negative sample'
        				)
        		)
        );
        
        $this->add(
        		array(
        				'name' => 'submitsensor',
        				'attributes' => array(
        						'class' => 'btn btn-meteo',
        						'type' => 'button',
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