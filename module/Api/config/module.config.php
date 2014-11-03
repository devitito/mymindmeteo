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
        	'admin-recreate-indexes' => array(
        		'type' => 'Zend\Mvc\Router\Http\Literal',
        		'options' => array(
        			'route'    => '/api/admin/indexes/recreate',
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin',
        				'action'     => 'recreate-indexes',
        			),
        		),
        	),
        	'admin-identity' => array(
        		'type' => 'Zend\Mvc\Router\Http\Literal',
        		'options' => array(
        			'route'    => '/api/admin/identity',
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin',
        				'action'     => 'identity',
        			),
        		),
        	),
        	'minds' => array(
        		'type' => 'segment',
        		'options' => array(
        			'route' => '/api/admin/minds[/:id]',
        			'constraints' => array(
        			//	'idd' => '[0-9]+',
        			),
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin\Mind'
        			),
        		),
        	),
        	'stats' => array(
        		'type' => 'segment',
        		'options' => array(
        			'route' => '/api/admin/stats[/:graph]',
        			'constraints' => array(
        				//	'stats' => '[0-9]+',
        			),
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin\Stat'
        			),
        		),
        	),
        	'sensors' => array(
        		'type' => 'segment',
        		'options' => array(
        			'route' => '/api/admin/sensors[/:id]',
        			'constraints' => array(
        				//	'id' => '[0-9]+',
        			),
        			'defaults' => array(
        				'controller' => 'Api\Controller\Admin\Sensor'
        			),
        		),
        	),
        ),
    ),
    'service_manager' => array(),
    'controllers' => array(
        'invokables' => array(
            'Api\Controller\Validate' => 'Api\Controller\ValidateController',
            'Api\Controller\Admin' => 'Api\Controller\AdminController',
            'Api\Controller\Admin\Mind' => 'Api\Controller\Admin\MindController',
            'Api\Controller\Admin\Stat' => 'Api\Controller\Admin\StatController',
            'Api\Controller\Admin\Sensor' => 'Api\Controller\Admin\SensorController'
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
