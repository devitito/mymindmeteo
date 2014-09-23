<?php 

namespace Application\Forms;

use Application\TestCase;
use Application\Entity\Mind;

class LoginTest extends TestCase
{
	protected $instance;
	
	public function setUp()
	{
		$formManager = self::getApplication()->getServiceManager()->get('FormElementManager');
		$this->instance = $formManager->get('login');
	}
	
	public function testBindingWithMind()
	{
		$data = array('nameoremail' => 'anameoremail', 'password' => 'apassword');
		
		$mind = new Mind();
		$this->instance->bind($mind);
		$this->instance->setData($data);
		
		$this->assertTrue($this->instance->isValid());
		$mind->exchangeArray($this->instance->getData());
		$this->assertSame('anameoremail', $mind->getNameoremail());
		$this->assertSame('apassword', $mind->getPassword());
		$this->assertSame(null, $mind->getId());
		$this->assertSame(null, $mind->getName());
		$this->assertSame(null, $mind->getEmail());
	}
}