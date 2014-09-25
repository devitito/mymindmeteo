<?php
/**
 *
 * @author devitito
 *
 */

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Crypt\Password\Bcrypt;
use Zend\Session\Container;

/** 
 * 
 * @ORM\Entity(repositoryClass="Application\Entity\Repository\MindRepository") 
 * @ORM\Table(name="`minds`")
 * 
 */
class Mind extends \ArrayObject implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	//protected $eventIdentifier = array('entities', 'entity.mind');
	
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="string", length=32, nullable=false, unique=true)
	 * @ORM\GeneratedValue(strategy="NONE")
	 */
	protected $id;
	
	/**
	 * @ORM\Column(name="name", type="string", length=64, nullable=true, unique=true)
	 */
	protected $name;
	
	/**
	 * @ORM\Column(name="email", type="string", length=128, nullable=true, unique=true)
	 */
	protected $email;
	
	/**
	 * @ORM\Column(name="password", type="string", length=128, nullable=true, unique=false)
	 */
	protected $password;
	
	protected $nameoremail;
	
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