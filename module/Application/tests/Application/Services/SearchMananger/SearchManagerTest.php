<?php

namespace Application\Services\SearchManager;

use Application\TestCase;
use Application\Exception;
use Application\Entity\IndexableInterface;
use Elastica\Client;

class SearchManagerTest extends TestCase
{
	protected $instance;
	protected $elastica;

	static public function setUpBeforeClass()
	{
		self::getApplication()->getServiceManager()
							->setInvokableClass('test.search-manager', '\Application\Services\SearchManager\SearchManager')
							->setShared('test.search-manager', false);
	}
	
	public function setUp()
	{
		$this->instance = self::getApplication()->getServiceManager()->get('test.search-manager');
		$this->elastica = self::getApplication()->getServiceManager()->get('elastica');
	}

	public function tearDown()
	{
		self::getApplication()->getServiceManager()->setAllowOverride(true);
		self::getApplication()->getServiceManager()->setService('elastica', $this->elastica);
	}
	
	public function testSmAccessor()
	{
		$expected = $this->instance->getServiceManager();
		$actual = $this->instance->setServiceManager($this->getApplication()->getServiceManager());
		$actual = $this->instance->getServiceManager();
	
		$this->assertSame($expected, $actual);
	}
	
	public function testExceptionIsThrownIfIndexingUnknownType()
	{
		$this->setExpectedException('Exception', Exception::getCustomMessage(Exception::UNKNOWN_TYPE));
		$document = $this->getMock('Application\Entity\IndexableInterface');
		$this->instance->index('atype', $document);
	}
	
	public function testIndexation()
	{
		$document = $this->getMock('Application\Entity\IndexableInterface');
		$document->expects($this->once())
					->method('getId')
					->will($this->returnValue('id'));
		$document->expects($this->once())
					->method('toIndexable')
					->will($this->returnValue(['id' => 'id', 'value' => 'value']));
		
		$type = $this->getMockBuilder('Elastica\Type')
						->disableOriginalConstructor()
						->getMock();
		$type->expects($this->once())
				->method('addDocument')
				->will($this->returnSelf());
		
		$index = $this->getMockBuilder('Elastica\Index')
					->disableOriginalConstructor()
					->getMock();
		$index->expects($this->once())
				 ->method('getType')
				->will($this->returnValue($type));
		$index->expects($this->once())
				->method('refresh')
				->will($this->returnSelf());
		
		$this->instance->setIndex($index);
		$this->instance->index('records', $document);
	}
	
	public function testElacticaGetter()
	{
		$this->assertSame($this->instance->getElastica(), $this->instance->getServiceManager()->get('elastica'));
	}
}