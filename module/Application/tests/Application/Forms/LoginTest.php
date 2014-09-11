<?php 

namespace Application\Forms;

use Application\TestCase;

class LoginTest extends TestCase
{
	protected $instance;
	
	public function setUp()
	{
		$formManager = self::getApplication()->getServiceManager()->get('FormElementManager');
		$this->instance = $formManager->get('login');
	}
	
	public function testNameoremailFieldTrim()
	{
		$data = array('nameoremail' => ' anameoremail ', 'password' => 'apassword');
		
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$this->instance->bind($mind);
		$this->instance->setData($data);
		
		$this->assertTrue($this->instance->isValid());
		$mind->exchangeArray($this->instance->getData());
		$this->assertSame('anameoremail', $mind->getNameoremail());
	}
}