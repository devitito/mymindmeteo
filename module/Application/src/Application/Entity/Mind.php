<?php
/**
 *
 * @author devitito
 *
 */

namespace Application\Entity;

use Zend\Crypt\Password\Bcrypt;
use Zend\Session\Container;

class Mind extends \ArrayObject implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	//protected $eventIdentifier = array('entities', 'entity.mind');
	
	protected $id;
	protected $name;
	protected $email;
	protected $nameoremail;
	protected $password;
	
	public function __construct($options = null)
	{
		if (!empty($options))
			$this->exchangeArray($options);
	}
	
	public function exchangeArray($data)
	{
		$this->id     = (isset($data['id'])) ? $data['id'] : null;
		$this->name = (isset($data['name'])) ? $data['name'] : null;
		$this->email  = (isset($data['email'])) ? $data['email'] : null;
		$this->password  = (isset($data['password'])) ? $data['password'] : null;
		$this->nameoremail  = (isset($data['nameoremail'])) ? $data['nameoremail'] : null;
	}
	
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
	
	/*public function remove()
	{
		$this->getEventManager()->trigger('remove.pre', $this);
	}*/
}