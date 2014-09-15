<?php 

namespace Application\InputFilters;

use Application\Exception;
use Application\TestCase;

class QuickRegistrationTest extends TestCase
{
	protected $instance;
	protected $dbAdapter;
	
	public function setUp()
	{
		$this->dbAdapter = self::getApplication()->getServiceManager()->get('Zend\Db\Adapter\Adapter');
		$this->instance = new QuickRegistration($this->dbAdapter);
	}
	
	public function testNameIsRequiered()
	{
		$data = array();
		$this->instance->setData($data);
	
		$messages = ['name' => ['isEmpty' => 'A mind name is required']];
	
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\NotEmpty) {
				$newValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
		
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testNameCannotbeZeoLenght()
	{
		$data = array('name' => '');
		$this->instance->setData($data);
		
		$messages = ['name' => ['isEmpty' => 'A mind name is required']];
		
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\NotEmpty) {
				$newValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
		
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testNameLenghtIsMaxed()
	{
		$data = array('name' => 'anameverymuchtoolong');
		$this->instance->setData($data);
	
		$messages = ['name' => ['stringLengthTooLong' => 'The input is more than 10 characters long']];
	
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\StringLength) {
				$newValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
	
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testNameRegexNotRespected()
	{
		$data = array('name' => 'é)àèù');
		$this->instance->setData($data);
	
		$messages = ['name' => ['regexNotMatch' => 'The mind name can consist of alphanumerical characters and dash only']];
	
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\Regex) {
				$newValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
	
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertFalse($this->instance->isValid());
		$this->assertSame($messages, $this->instance->getMessages());
	}
	
	public function testNameRegexRespected()
	{
		$data = array('name' => 'a-name');
		$this->instance->setData($data);
	
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\Regex) {
				$newValidatorChain->attach($validator['instance'], $validator['breakChainOnFailure']);
			}
		}
	
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertTrue($this->instance->isValid());
		$this->assertEmpty($this->instance->getMessages());
	}
	
	public function testNameIsCheckedAgainstDb()
	{
		$data = array('name' => 'a-name');
		$this->instance->setData($data);
		
		$messages = ['name' => ['NoRecordExistsErrorRecordFound' => 'The specified name already exists in database']];
		
		$options = ['table' => 'minds', 'field' => 'name', 'adapter' => $this->dbAdapter,
					'messages' => [\Zend\Validator\Db\NoRecordExists::ERROR_RECORD_FOUND => 'The specified name already exists in database']];
		$mocknodbexistvalidator = $this->getMock('Zend\Validator\Db\NoRecordExists', ['isValid'], ['options' => $options]);
		
		$mocknodbexistvalidator->expects($this->once())
								->method('isValid')
								->will($this->returnValue(false));
		
		// create new validator chain
		$newValidatorChain = new \Zend\Validator\ValidatorChain;
		foreach ($this->instance->get('name')->getValidatorChain()->getValidators() as $validator) {
			if ($validator['instance'] instanceof \Zend\Validator\Db\NoRecordExists) {
				$newValidatorChain->attach($mocknodbexistvalidator, $validator['breakChainOnFailure']);
			}
		}
		
		$this->instance->get('name')->setValidatorChain($newValidatorChain);
		$this->instance->setValidationGroup('name');
		$this->assertFalse($this->instance->isValid());
	}
}