<?php
namespace Application;

use Zend\Mvc\Application;

class TestCase extends \PHPUnit_Framework_TestCase
{
	/**
	 * Tested object instance
	 */
	protected $instance;
	
	/**
	 * Shares the application object among tests
	 * 
	 * @var \Zend\Mvc\Application
	 */
	static protected $application;
	
	static public function setApplication(Application $application)
	{
		self::$application = $application;
	}
	
	static public function getApplication()
	{
		return self::$application;
	}
}