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
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            	'may_terminate' => true,
            	'child_routes' => array(
            		'default' => array(
            			'type'    => 'Segment',
            			'options' => array(
            				'route'    => ':mindname[/:action[/:sensorid/:sampleid]]',
            				'constraints' => array(
            					'mindname'     => '[a-zA-Z][a-zA-Z0-9-]*',
            					'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
            				//	'sensorid'     => '[0-9]*',
            				//	'sampleid'     => '[a-zA-Z][a-zA-Z0-9_-]*'
            					),
            				'defaults' => array(
            					'controller' => 'Application\Controller\Mind',
            					'action' => 'dashboard',
            				),
            			),
            		),
            	),
            ),
            // The following is a route to simplify getting started creating
            // new controllers and actions without needing to create a new
            // module. Simply drop new controllers in, and you can access them
            // using the path /application/:controller/:action
            'application' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/application',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Application\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),
            'join' => array(
            		'type' => 'Zend\Mvc\Router\Http\Literal',
            		'options' => array(
            				'route'    => '/join',
            				'defaults' => array(
            						'controller' => 'Application\Controller\Index',
            						'action'     => 'join',
            				),
            		),
            ),
            'login' => array(
            		'type' => 'Zend\Mvc\Router\Http\Literal',
            		'options' => array(
            				'route'    => '/login',
            				'defaults' => array(
            						'controller' => 'Application\Controller\Index',
            						'action'     => 'login',
            				),
            		),
            ),
            'logout' => array(
            		'type' => 'Zend\Mvc\Router\Http\Literal',
            		'options' => array(
            				'route'    => '/logout',
            				'defaults' => array(
            						'controller' => 'Application\Controller\Index',
            						'action'     => 'logout',
            				),
            		),
            ),
        ),
    ),
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
        ),
        'factories' => array(
        	'AuthService' => 'Application\Services\Factory\AuthenticationFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
            'Zend\Authentication\AuthenticationService' => 'AuthService',
        ),
        'invokables' => array(
        	'mind-manager' => 'Application\Services\MindManager\MindManager',
        	'search-manager' => 'Application\Services\SearchManager\SearchManager',
        ),
        'shared' => array(
        	//'entity.mind' => false,
        ),
    ),
    'translator' => array(
        'locale' => 'en_US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Application\Controller\Index' => 'Application\Controller\IndexController',
            'Application\Controller\Mind' => 'Application\Controller\MindController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
            'partials/quickRegistration'             => __DIR__ . '/../view/partials/quickRegistration.phtml',
            'partials/navbar-logged-out'             => __DIR__ . '/../view/partials/navbar-logged-out.phtml',
            'partials/reports-list'             => __DIR__ . '/../view/partials/reports-list.phtml',
            'contribution/sensor/error'             => __DIR__ . '/../view/contribution/sensor/error.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
    'session' => array(
    	'config' => array(
    		'remember_me_seconds'  => 180,
    		'use_cookies'          => true,
    		'cookie_httponly'      => true,
    	),
    ),
    'asset_manager' => array(
    	'resolver_configs' => array(
    		'paths' => array(
    			'Application' => __DIR__ . '/../public',
    		),
    	),
    	'caching' => array(
    		'default' => array(
    			'cache'     => 'Assetic\\Cache\\ApcCache',
    		),
    	),
    ),
    'doctrine' => array(
	    'authentication' => array(
	    	'orm_default' => array(
	    		'object_manager' => 'Doctrine\ORM\EntityManager',
	    			'identity_class' => 'Application\Entity\Mind',
	    			'identity_property' => 'name',
	    			'credential_property' => 'password',
	    			'credential_callable' => 'Application\Services\MindManager\MindManager::verifyHashedPassword',
	    	),
	    ),
    	'driver' => array(
    		'application_entities' => array(
    			'class' =>'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
    			'cache' => 'array',
    			'paths' => array(__DIR__ . '/../src/Application/Entity')
    		),
    		'orm_default' => array(
    			'drivers' => array(
    				'Application\Entity' => 'application_entities'
    			),
    		),
    	),
    	'configuration' => array(
    			'orm_default' => array(
    					'types' => array(
    							'utcdatetime' => 'Application\Types\UTCDateTimeType',
    					),
    			),
    	)
    ),
);
