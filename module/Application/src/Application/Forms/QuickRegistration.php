<?php

namespace Application\Forms;

use Zend\Form\Form;

class QuickRegistration extends Form
{
    public function init()
    {
    	$this->setAttribute('method', 'post');
    	$this->setAttribute('accept-charset', 'UTF-8');
    	$this->setAttribute('action', 'join');
    	$this->setAttribute('id', 'quickRegistrationForm');
    	
        $this->add(
            array(
                'name' => 'name',
                'attributes' => array(
                    'type' => 'text',
                    'class' => 'form-control input-lg',
                    'placeholder' => 'Your mind'
                ),
                'options' => array(
                    'label' => 'Mind name'
                )
            )
        );
        
        $this->add(
        	array(
        		'name' => 'email',
        		'attributes' => array(
        			'type' => 'email',
        			'class' => 'form-control input-lg',
        			'placeholder' => 'Your email'
        		),
        		'options' => array(
        			'label' => 'Email'
        		)
        	)
        );

        $this->add(
            array(
                'name' => 'password',
                'attributes' => array(
                    'type' => 'password',
                    'class' => 'form-control input-lg',
                    'placeholder' => 'Password'
                ),
                'options' => array(
                    'label' => 'Password'
                )
            )
        );

        $this->add(
            array(
                'name' => 'submiquickreg',
                'attributes' => array(
                	'class' => 'btn btn-meteo',
                    'type' => 'submit',
                	'value' => 'Register',
                )
            )
        );
        
    }

}