<?php
/**
 *
 * @author devitito
 *
 */

namespace Application\Entity;

use Zend\Crypt\Password\Bcrypt;

class Mind extends \ArrayObject implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	public $id;
	public $name;
	public $email;
	public $password;
	public $nameoremail;
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id = $value;
		return $this;
	}
	
	public function getName()
	{
		return $this->name;
	}
	
	public function setName($value)
	{
		$this->name = $value;
		return $this;
	}
	
	public function getEmail()
	{
		return $this->email;
	}
	
	public function setEmail($value)
	{
		$this->email = $value;
		return $this;
	}
	
	public function getNameoremail()
	{
		return $this->nameoremail;
	}
	
	public function setNameoremail($value)
	{
		$this->nameoremail = $value;
		return $this;
	}
	
	public function getPassword()
	{
		return $this->password;
	}
	
	public function setPassword($value)
	{
		$this->password = $value;
		return $this;
	}
}