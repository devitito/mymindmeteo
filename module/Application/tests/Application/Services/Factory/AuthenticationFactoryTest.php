<?php
namespace Application\Services\Factory;

use Zend\ServiceManager\ServiceManager;
use Application\TestCase;
use Application\Entity\Mind;

class AuthenticationFactoryTest extends TestCase
{
	protected $instance;

	public function setUp()
	{
		$this->instance =  new AuthenticationFactory();
	}
	
	public function testFactoryImplementsExpectedInterface()
	{
		$this->assertInstanceOf('\Zend\ServiceManager\FactoryInterface', $this->instance);
	}
	
	public function testWillInstantiateAuthenticateService()
	{
		$service = $this->instance->createService(self::getApplication()->getServiceManager());
		$this->assertInstanceOf('\Zend\Authentication\AuthenticationService', $service);
	}
}