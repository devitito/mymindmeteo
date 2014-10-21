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
            						'controller' => 'Api\Controller\Validate',
            						'action'     => 'mind-name',
            				),
            		),
            ),
        	'validate-mind-email' => array(
        			'type' => 'Zend\Mvc\Router\Http\Literal',
        			'options' => array(
        					'route'    => '/api/validate-mind-email',
        					'defaults' => array(
        							'controller' => 'Api\Controller\Validate',
        							'action'     => 'mind-email',
        					),
        			),
        	),
        	'admin-list-mind' => array(
        		'type' => 'Zend\Mvc\Router\Http\Literal',
        		'options' => array(
        			'route'    => '/api/admin/mind-list',
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin',
        				'action'     => 'mind-list',
        			),
        		),
        	),
        	'admin-recover-records' => array(
        		'type' => 'Zend\Mvc\Router\Http\Literal',
        		'options' => array(
        			'route'    => '/api/admin/records/recover',
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin',
        				'action'     => 'recover-records',
        			),
        		),
        	),
        ),
    ),
    'service_manager' => array(),
    'controllers' => array(
        'invokables' => array(
            'Api\Controller\Validate' => 'Api\Controller\ValidateController',
            'Api\Controller\Admin' => 'Api\Controller\AdminController'
        ),
    ),
	'view_manager' => array(
		'template_path_stack' => array(
			__DIR__ . '/../view',
		),
		'strategies' => array(
			'ViewJsonStrategy',
		),
	),
);
