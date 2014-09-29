<?php

namespace Application\Services\MindManager;

use Application\TestCase;
use Application\Entity\Mind;
use Application\Exception;
use Zend\Config\Config;
use Zend\Crypt\Password\Bcrypt;
use ReflectionClass;

/**
 * Override uniqid() in current namespace for testing
 *
 * @return string
 */
function uniqid()
{
	return 'uniqid';
}

/**
 * Override DateTime(now) in current namespace for testing
 *
 * @return string
 */
function DateTime($string)
{
	return new \DateTime('2010-04-25 02:24:16');
}

class MindManagerTest extends TestCase
{
	protected $instance;
	protected $em;

	static public function setUpBeforeClass()
	{
		self::getApplication()->getServiceManager()
							->setInvokableClass('test.mind-manager', '\Application\Services\MindManager\MindManager')
							->setShared('test.mind-manager', false);
	}
	
	public function setUp()
	{
		$this->instance = $this->instance = $this->getApplication()->getServiceManager()->get('test.mind-manager');
		$this->em = self::getApplication()->getServiceManager()->get('doctrine.entitymanager.orm_default');
	}

	public function tearDown()
	{
		self::getApplication()->getServiceManager()->setAllowOverride(true);
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $this->em);
	}
	
	protected static function getMethod($name) 
	{
		$class = new ReflectionClass('Application\Services\MindManager\MindManager');
		$method = $class->getMethod($name);
		$method->setAccessible(true);
		return $method;
	}
	
	public function testSmAccessor()
	{
		$expected = $this->instance->getServiceManager();
		$actual = $this->instance->setServiceManager($this->getApplication()->getServiceManager());
		$actual = $this->instance->getServiceManager();
	
		$this->assertSame($expected, $actual);
	}
	
	public function testIfEntityManagerIsNullWillRequestItFromServiceManager()
	{
		$foo = self::getMethod('getEntityManager');
		
		$this->assertSame($foo->invokeArgs($this->instance, []), self::getApplication()->getServiceManager()->get('doctrine.entitymanager.orm_default'));
	}
	
	public function testSaveThrowExceptionIfInputIsNotAMindClass()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::OPERATION_FAILED));
		$this->instance->save('');
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::OPERATION_FAILED));
		$this->instance->save(['key' => 'value']);
	}
	
	public function testSaveCallEntityManagerPersistAndFlush()
	{
		$data = ['id' => 'uniqid', 'name' => 'aname', 'password' => 'apassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => null];
		$mind = new Mind($data);
	
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
		   ->method('persist')
		   ->with($mind)
		   ->will($this->returnSelf());
		$em->expects($this->once())
			->method('flush')
			->will($this->returnSelf());
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);

		//$foo = self::getMethod('setEntityManager');
		//$foo->invokeArgs($this->instance, [null]);
		
		$this->instance->save($mind);
	}
	
	public function testSaveGenerateId()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'apassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => null];
		$mind = new Mind($data);
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('persist')
			->with($mind)
			->will($this->returnSelf());
		$em->expects($this->once())
			->method('flush')
			->will($this->returnSelf());
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
		
		//$foo = self::getMethod('setEntityManager');
		//$foo->invokeArgs($this->instance, [null]);
		
		$this->instance->save($mind);
		$this->assertEquals($mind['id'], uniqid());
	}
	
	public function testSaveEncryptPassword()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => null];
		$mind = new Mind($data);
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('persist')
			->with($mind)
			->will($this->returnSelf());
		$em->expects($this->once())
			->method('flush')
			->will($this->returnSelf());
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
		
		$this->instance->save($mind);
		$this->assertTrue($this->instance->verifyHashedPassword($mind, 'aapassword'));
	}
	
	public function testSaveSetJoindate()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => null];
		$mind = new Mind($data);
	
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('persist')
			->with($mind)
			->will($this->returnSelf());
		$em->expects($this->once())
			->method('flush')
			->will($this->returnSelf());
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
	
		$this->instance->save($mind);
		//$this->assertNotNull($mind->getJoindate());
		$created = new \DateTime(date('Y-m-d H:i:s', strtotime("-2 minutes")));

		$this->assertAttributeLessThanOrEqual(new \DateTime("now"), 'joindate', $mind);// assertEquals(DateTime("2010-04-25 02:24:16"), $mind->getJoindate());
		$this->assertAttributeGreaterThan($created, 'joindate', $mind);// assertEquals(DateTime("2010-04-25 02:24:16"), $mind->getJoindate());
		$this->assertEquals(date_default_timezone_get(),$mind->getTimezone());
	}
	
	public function testSaveDontOverRideIdAndPassword()
	{
		$data = ['id' => 'someid', 'name' => 'aname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null];
		$mind = new Mind($data);
		
		$bcrypt = new Bcrypt();
		$mind['password'] = $bcrypt->create($mind['password']);
		
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('persist')
			->with($mind)
			->will($this->returnSelf());
		$em->expects($this->once())
			->method('flush')
			->will($this->returnSelf());
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
		
		$this->instance->save($mind);
		$this->assertEquals('someid', $mind['id']);
		$this->assertTrue($this->instance->verifyHashedPassword($mind, 'aapassword'));
	}
	
	public function testSaveCatchException()
	{
		$data = ['id' => null, 'name' => 'aname', 'password' => 'apassword', 'email' => 'anemail', 'nameoremail' => null];
		$mind = new Mind($data);
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('persist')
			->with($mind)
			->will($this->returnSelf());
		$em->expects($this->once())
		   ->method('flush')
		   ->will($this->throwException(new Exception()));
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
		
		//$foo = self::getMethod('setEntityManager');
		//$foo->invokeArgs($this->instance, [null]);
		
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::OPERATION_FAILED));
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
		
		$rep = $this->getMockBuilder('Doctrine\ORM\EntityRepository')
					->disableOriginalConstructor()
					->getMock();
		$rep->expects($this->once())
			->method('findBy')
			->with($options)
			->will($this->returnValue([]));
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
				  ->disableOriginalConstructor()
		 		  ->getMock();
		$em->expects($this->once())
				  ->method('getRepository')
				  ->with('Application\Entity\Mind')
				  ->will($this->returnValue($rep));
		
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
		
		//$foo = self::getMethod('setEntityManager');
		//$foo->invokeArgs($this->instance, [null]);
		
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
	
	public function testVerifyHashedPassword()
	{
		$bcrypt = new Bcrypt();
		$data = ['id' => null, 'name' => 'aname', 'email' => 'anemail', 'nameoremail' => null];
		$mind = new Mind($data);
		$mind->setPassword($bcrypt->create('apassword'));
		
		$this->assertTrue($this->instance->verifyHashedPassword($mind, 'apassword'));
		$this->assertFalse($this->instance->verifyHashedPassword($mind, 'anotherpassword'));
	}
}