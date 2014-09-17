<?php

namespace Application\Services\LoginManager;

use Application\TestCase;
use Application\Entity\Mind;
use Application\Exception;
use Application\Services\MindManager\MindManager;
use Zend\Crypt\Password\Bcrypt;

class LoginManagerTest extends TestCase
{
	protected $instance;
	protected $mindmanager;

	public function setUp()
	{
		$this->instance = self::getApplication()->getServiceManager()->get('login-manager');
		$this->mindmanager = self::getApplication()->getServiceManager()->get('mind-manager');
		self::getApplication()->getServiceManager()->setAllowOverride(true);
	}
	
	public function tearDown()
	{
		self::getApplication()->getServiceManager()->setService('mind-manager', $this->mindmanager);
	}
	
	public function testSmAccessor()
	{
		$expected = $this->instance->getServiceManager();
		$actual = $this->instance->setServiceManager($this->getApplication()->getServiceManager());
		$actual = $this->instance->getServiceManager();
	
		$this->assertSame($expected, $actual);
	}
	
	public function testCheckCredentialThrowExceptionIfInputIsNotArrayOrMindClass()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::LOGIN_FAILED));
		$this->instance->checkCredentials('');
		
	}
	
	public function testCheckCredentialThrowExceptionIfInputIsArrayWithoutNameorEmail()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::LOGIN_FAILED));
		$this->instance->checkCredentials(['password' => 'apassword']);
	
	}
	
	public function testCheckCredentialThrowExceptionIfInputIsArrayWithoutPassword()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::LOGIN_FAILED));
		$this->instance->checkCredentials(['nameoremail' => 'anameoremail']);
	}
	
	public function testCheckCredentialsThrowExceptionWithUnititializedMindClass()
	{
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::LOGIN_FAILED));
		$this->instance->checkCredentials($mind);
	}
	
	public function testCheckCredentialsAgainstUnknownNameorEmail()
	{
		$mind = ['nameoremail' => 'unknown', 'password' => 'apassword'];
		
		$mindmanager = $this->getMock('Application\Services\MindManager\MindManager');
		$mindmanager->expects($this->once())
					->method('getMind')
					->with($mind)
					->will($this->returnValue(null));
		
		self::getApplication()->getServiceManager()->setService('mind-manager', $mindmanager);
		$this->assertNUll($this->instance->checkCredentials($mind));
	}
	
	public function testCheckCredentialsAgainstKnownNameorEmailWithWrongPassword()
	{
		$mind = ['nameoremail' => 'anameoremail', 'password' => 'wrongapassword'];
		$bcrypt = new Bcrypt();
		
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray(array(
				'id' 			=> '54',
				'name'     		=> 'aname',
				'email'  		=> 'anemail',
				'password'		=> $bcrypt->create('apassword')));
		
		$mindmanager = $this->getMock('Application\Services\MindManager\MindManager');
		$mindmanager->expects($this->once())
					->method('getMind')
					->with($mind)
					->will($this->returnValue($mindResult));
	
		self::getApplication()->getServiceManager()->setService('mind-manager', $mindmanager);
		$this->assertNull($this->instance->checkCredentials($mind));
	}
	
	public function testCheckCredentialsAgainstKnownNameorEmailWithCorrectPassword()
	{
		$bcrypt = new Bcrypt();
		$data = ['nameoremail' => 'anameoremail', 'password' => 'apassword'];
		$dataout = array(
				'id' 			=> '54',
				'name'     		=> 'aname',
				'email'  		=> 'anemail',
				'password'		=> $bcrypt->create('apassword'));
	
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray($dataout);
		
		$mindmanager = $this->getMock('Application\Services\MindManager\MindManager');
		$mindmanager->expects($this->once())
					->method('getMind')
					->with($data)
					->will($this->returnValue($mindResult));
	
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$mind->exchangeArray($dataout);
		
		self::getApplication()->getServiceManager()->setService('mind-manager', $mindmanager);
		$this->assertEquals($mind, $this->instance->checkCredentials($data));
	}
}
