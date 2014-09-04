<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

return array(
    'router' => array(
        'routes' => array(
            'validate-mind-name' => array(
            		'type' => 'Zend\Mvc\Router\Http\Literal',
            		'options' => array(
            				'route'    => '/api/validate-mind-name',
            				'defaults' => array(
            						'controller' => 'api\validate',
            						'action'     => 'mindName',
            				),
            		),
            ),
        	'validate-mind-email' => array(
        			'type' => 'Zend\Mvc\Router\Http\Literal',
        			'options' => array(
        					'route'    => '/api/validate-mind-email',
        					'defaults' => array(
        							'controller' => 'api\validate',
        							'action'     => 'mindEmail',
        					),
        			),
        	),
        ),
    ),
    'service_manager' => array(),
    'controllers' => array(
        'invokables' => array(
            'api\validate' => 'Api\Controller\ValidateController'
        ),
    ),
	'view_manager' => array(
		'strategies' => array(
			'ViewJsonStrategy',
		),
	),
);
