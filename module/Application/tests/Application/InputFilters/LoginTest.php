<?php 

namespace Application\InputFilters;

use Application\Exception;
use Application\TestCase;
use Zend\InputFilter\InputFilterInterface;

class LoginTest extends TestCase
{
	protected $instance;
	
	public function setUp()
	{
		$this->instance = new Login();
	}
	
	public function testNameoremailIsRequiered()
	{
		$data = array('password' => 'apassword');
		$this->instance->setData($data);
		
		$messages = ['nameoremail' => ['isEmpty' => 'A name or an email is required']];
		
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testPasswordIsRequiered()
	{
		$data = array('nameoremail' => 'anameoremail');
		$this->instance->setData($data);
		
		$messages = ['password' => ['isEmpty' => 'A password is required']];
	
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testNameoremailFieldCannotbeEmpty()
	{
		$data = array('nameoremail' => '', 'password' => 'apassword');
		$this->instance->setData($data);
		
		$messages = ['nameoremail' => ['isEmpty' => 'A name or an email is required']];
		
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testPasswordFieldCannotbeEmpty()
	{
		$data = array('nameoremail' => 'anameoremail', 'password' => '');
		$this->instance->setData($data);
		
		$messages = ['password' => ['isEmpty' => 'A password is required']];
		
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	/*
	public function testNameoremailFieldTrim()
	{
		$data = array('nameoremail' => 'a nameoremail', 'password' => 'apassword');
	
		$this->instance->setData($data);
		print_r($this->instance->getMessages());
		$this->assertTrue($this->instance->isValid());
		$this->assertSame('anameoremail', $this->instance->getValue('nameoremail'));
	}*/
}