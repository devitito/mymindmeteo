<?php 

namespace Application\Forms;

use Application\TestCase;
use Application\Entity\Mind;

class QuickRegistrationTest extends TestCase
{
	protected $instance;
	
	public function setUp()
	{
		$formManager = self::getApplication()->getServiceManager()->get('FormElementManager');
		$this->instance = $formManager->get('quickRegistration');
	}
	
	public function testQuickRegistrationFormBindingWithMind()
	{
		$data = array('name' => 'aname', 'email' => 'anemail@something.com', 'password' => 'apassword');
		
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$this->instance->bind($mind);
		$this->instance->setData($data);
		
		// create new name validator chain (with db check)
		$newNameValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->getInputFilter()->get('name')->getValidatorChain()->getValidators() as $validator) {
			if (!($validator['instance'] instanceof \Zend\Validator\Db\NoRecordExists)) {
				$newNameValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
		
		$this->instance->getInputFilter()->get('name')->setValidatorChain($newNameValidatorChain);
		
		// create new email validator chain (with db check)
		$newEmailValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->getInputFilter()->get('email')->getValidatorChain()->getValidators() as $validator) {
			if (!($validator['instance'] instanceof \Zend\Validator\Db\NoRecordExists)) {
				$newEmailValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
		
		$this->instance->getInputFilter()->get('email')->setValidatorChain($newEmailValidatorChain);
		
		$this->assertTrue($this->instance->isValid());
		$mind->exchangeArray($this->instance->getData());
		$this->assertSame(null, $mind->getNameoremail());
		$this->assertSame('apassword', $mind->getPassword());
		$this->assertSame(null, $mind->getId());
		$this->assertSame('aname', $mind->getName());
		$this->assertSame('anemail@something.com', $mind->getEmail());
	}
}