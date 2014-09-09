<?php

namespace Application\Forms;

use Zend\Form\Form;

class Login extends Form
{
    public function init()
    {
    	$this->setAttribute('method', 'post');
    	$this->setAttribute('accept-charset', 'UTF-8');
    	$this->setAttribute('action', 'login');
    	
        $this->add(
            array(
                'name' => 'nameoremail',
                'attributes' => array(
                    'type' => 'text',
                    'class' => 'form-control input-lg',
                 //   'placeholder' => 'Enter your login or email address'
                ),
                'options' => array(
                    'label' => 'Mind or email address'
                )
            )
        );

        $this->add(
            array(
                'name' => 'password',
                'attributes' => array(
                    'type' => 'password',
                    'class' => 'form-control input-lg',
                   // 'placeholder' => 'Enter your password'
                ),
                'options' => array(
                    'label' => 'Password'
                )
            )
        );

        $this->add(
            array(
                'name' => 'submit',
                'attributes' => array(
                	'class' => 'btn btn-success btn-lg btn-block',
                    'type' => 'submit',
                    'value' => 'Sign In'
                )
            )
        );
        
    }

}