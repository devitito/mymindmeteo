<?php

namespace Application\Services\MindManager;

use Application\TestCase;
use Application\Entity\Mind;
use Application\Exception;
use Zend\Config\Config;
use Zend\Crypt\Password\Bcrypt;

class MindManagerTest extends TestCase
{
	protected $instance;
	protected $mindtable;

	public function setUp()
	{
		$this->instance = self::getApplication()->getServiceManager()->get('mind-manager');
		$this->mindtable = self::getApplication()->getServiceManager()->get('Application\Models\DbTable\MindTable');
		self::getApplication()->getServiceManager()->setAllowOverride(true);
	}

	public function tearDown()
	{
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $this->mindtable);
	}
	
	public function testSmAccessor()
	{
		$expected = $this->instance->getServiceManager();
		$actual = $this->instance->setServiceManager($this->getApplication()->getServiceManager());
		$actual = $this->instance->getServiceManager();
	
		$this->assertSame($expected, $actual);
	}
	
	public function testIfMindTableIsNullWillRequestItFromServiceManager()
	{
		$this->instance->setMindTable(null);
		$this->assertSame($this->mindtable, $this->instance->getMindTable());
	}
	
	public function testSaveThrowExceptionIfInputIsNotAnArrayNorAMindClass()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::OPERATION_FAILED));
		$this->instance->save('');
	}
	
	public function testSaveForwardExceptionIfInsertTableFails()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'apassword', 'email' => 'anemail', 'nameoremail' => null];
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$mind->exchangeArray($data);
		
		$mindModel = new \Application\Models\Mind;
		$mindModel->exchangeArray($data);
		
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						  ->disableOriginalConstructor()
						  ->getMock();
		$mindtable->expects($this->once())
				  ->method('saveMind')
				  ->with($mindModel)
				  ->will($this->throwException(new \Exception()));
		
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
		$this->setExpectedException('\Exception');
		$this->instance->save($mind);
	}
	
	public function testSaveCallSaveMind()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'apassword', 'email' => 'anemail', 'nameoremail' => null];
		$mind = self::getApplication()->getServiceManager()->get('entity.mind');
		$mind->exchangeArray($data);
		
		$mindModel = new \Application\Models\Mind;
		$mindModel->exchangeArray($data);
		
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						  ->disableOriginalConstructor()
						  ->getMock();
		$mindtable->expects($this->once())
				  ->method('saveMind')
		          ->with($mindModel)
		          ->will($this->returnSelf());
		
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
		$this->instance->save($mind);
	}
	
	public function testIsAvailableThrowExceptionIfInputIsEmpty()
	{
		$this->setExpectedException('\InvalidArgumentException', 'The options parameter must not be empty');
		$this->instance->isAvailable([]);
	}
	
	public function testIsAvailableByConfig()
	{
		$options = array(
				'name'       => 'aname',
				'email'       => 'anemail@something.com'
			);
		$config  = new Config($options);
		
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						  ->disableOriginalConstructor()
		 				  ->getMock();
		$mindtable->expects($this->once())
				  ->method('existMind')
				  ->with(['name' => 'aname'])
				  ->will($this->returnValue(false));
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
		
		$this->assertTrue($this->instance->isAvailable($config));
	}
	
	public function testIsAvailableThrowExceptionIfInputIsNotAnArray()
	{
		$this->setExpectedException('\InvalidArgumentException', 'The options parameter must be an array or a Traversable');
		$this->instance->isAvailable(3);
	}
	
	public function testIsAvailableThrowExceptionIfInputCannotAuthenticateAMind()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::UNKNOWN_MIND));
		$this->instance->isAvailable(['data' => 'adata']);
	}
	
	public function testIsAvailableById()
	{
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						  ->disableOriginalConstructor()
						  ->getMock();
		$mindtable->expects($this->once())
		           ->method('existMind')
				   ->with(['id' => 'anid'])
				   ->will($this->returnValue(false));
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
		
		$this->assertTrue($this->instance->isAvailable(['id' => 'anid', 'name' => 'aname', 'email' => 'anemail@something.com']));
	}
	
	public function testIsAvailableByEmail()
	{
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						  ->disableOriginalConstructor()
						  ->getMock();
		$mindtable->expects($this->once())
				  ->method('existMind')
				  ->with(['email' => 'anemail@something.com'])
				  ->will($this->returnValue(false));
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
	
		$this->assertTrue($this->instance->isAvailable(['email' => 'anemail@something.com']));
	}
	
	public function testgetMindThrowExceptionWithWrongInputClass()
	{
		$options = array(
				'name'       => 'aname',
				'email'       => 'anemail@something.com'
		);
		$config  = new Config($options);
		
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::UNKNOWN_MIND));
		$this->instance->getMind($config);
	}
	
	public function testgetMindThrowExceptionIfInputDoesntContainNeededKeys()
	{
		$options = array();
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::UNKNOWN_MIND));
		$this->instance->getMind($options);
	}
	
	public function testgetMindSearchByIdFirst()
	{
		$bcrypt = new Bcrypt();
		$options = array(
				'nameoremail' => 'anameoremail',
				'name'       => 'aname',
				'email'       => 'anemail@something.com',
				'id'		=> 'anid'
		);
		
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray(array(
				'id' 			=> 'anid',
				'name'     		=> 'aname',
				'email'  		=> 'anemail@something.com',
				'password'		=> $bcrypt->create('apassword')));
		
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
							->disableOriginalConstructor()
							->getMock();
		$mindtable->expects($this->once())
				->method('getMindById')
				->with('anid')
				->will($this->returnValue($mindResult));
		$mindtable->expects($this->never())
				  ->method('getMindByNameoremail');
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
		
		$this->assertEquals($mindResult, $this->instance->getMind($options));
	}
	
	public function testgetMindSearchByNameorEmailSecond()
	{
		$bcrypt = new Bcrypt();
		$options = array(
				'name'       => 'aname',
				'nameoremail' => 'aname',
				'email'       => 'anemail@something.com'
		);
	
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray(array(
				'id' 			=> 'anid',
				'name'     		=> 'aname',
				'email'  		=> 'anemail@something.com',
				'password'		=> $bcrypt->create('apassword')));
		
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						->disableOriginalConstructor()
						->getMock();
		$mindtable->expects($this->once())
				->method('getMindByNameoremail')
				->with('aname')
				->will($this->returnValue($mindResult));
		$mindtable->expects($this->never())
				->method('getMindById');
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
	
		$this->assertEquals($mindResult, $this->instance->getMind($options));
	}
	
	public function testgetMindSearchByNameThird()
	{
		$bcrypt = new Bcrypt();
		$options = array(
				'email'       => 'anemail@something.com',
				'name'       => 'aname'
		);
	
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray(array(
				'id' 			=> 'anid',
				'name'     		=> 'aname',
				'email'  		=> 'anemail@something.com',
				'password'		=> $bcrypt->create('apassword')));
	
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
						->disableOriginalConstructor()
						->getMock();
		$mindtable->expects($this->once())
					->method('getMindByNameoremail')
					->with('aname')
					->will($this->returnValue($mindResult));
		$mindtable->expects($this->never())
					->method('getMindById');
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
	
		$this->assertEquals($mindResult, $this->instance->getMind($options));
	}
	
	public function testgetMindSearchByEmailLast()
	{
		$bcrypt = new Bcrypt();
		$mind = ['email' => 'anemail@something.com'];
	
		$mindResult = new \Application\Models\Mind();
		$mindResult->exchangeArray(array(
				'id' 			=> 'anid',
				'name'     		=> 'aname',
				'email'  		=> 'anemail@something.com',
				'password'		=> $bcrypt->create('apassword')));
	
		$mindtable = $this->getMockBuilder('Application\Models\DbTable\MindTable')
							->disableOriginalConstructor()
							->getMock();
		$mindtable->expects($this->once())
					->method('getMindByNameoremail')
					->with('anemail@something.com')
					->will($this->returnValue($mindResult));
		$mindtable->expects($this->never())
					->method('getMindById');
		
		self::getApplication()->getServiceManager()->setService('Application\Models\DbTable\MindTable', $mindtable);
		$this->instance->setMindTable($mindtable);
	
		$this->assertEquals($mindResult, $this->instance->getMind($mind));
	}
}