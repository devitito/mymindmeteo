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
        ),
    ),
    'service_manager' => array(),
    'controllers' => array(
    ),
	'view_manager' => array(
	),
	'acl' => array(
		'roles' => array(
			'guest'   => null,
			'mind'  => 'guest',
			'meteologist' => 'mind',
			'admin' => 'meteologist'
		),
		'resources' => array(
			//permissions => controllers	
			'allow' => array(
				//controller => actions
				'Api\Controller\Validate' => array(
					'mindEmail' => 'guest',
					'mindName' => 'guest'
				),
				'Application\Controller\Index' => array(
					'index' => 'guest',
					'join' => 'guest',
					'login' => 'guest',
					'logout' => 'mind'
				),
				'Application\Controller\Mind' => array(
					'dashboard' => 'guest',
					'meteochart' => 'guest',
					'nb-sunny-days' => 'guest',
					'nb-rainy-days' => 'guest',
					'nb-test-completed' => 'guest',
					'record' => 'mind',
					'measure' => 'mind',
					'add-sensor-and-samples' => 'meteologist',
					'recover-un-indexed' => 'admin'					
				),
				'Application\Controller\Error' => array(
					'all' => 'guest'
				)
			)
		)
	)
);
