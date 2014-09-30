<?php

namespace Application\Entity;

use Application\TestCase;

class MindManagerTest extends TestCase
{
	protected $instance;

	public function setUp()
	{
		$this->instance = new Mind();
	}
	
	public function testArrayAccess()
	{
		$this->instance['id'] = 'anid';
		$this->assertEquals('anid', $this->instance->getId());
		$this->assertEquals($this->instance['id'], $this->instance->getId());
		unset ($this->instance['id']);
		$this->assertFalse(isset($this->instance['id']));
	}
	
	public function testDefaultTimezoneIsUsedIfNoneDefined()
	{
		$this->instance->setTimezone(null);
		$this->assertEquals(date_default_timezone_get(), $this->instance->getTimezone());
	}
}