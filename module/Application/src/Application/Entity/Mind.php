<?php
/**
 *
 * @author devitito
 *
 */

namespace Application\Entity;

use Zend\Crypt\Password\Bcrypt;

class Mind  extends \ArrayObject 
{
	protected $id;
	protected $name;
	protected $email;
	protected $password;
	protected $nameoremail;
		
	/**
	 * 
	 * @param array|Traversable $options
	 * @throws Exception\InvalidArgumentException
	 */
	public function __construct($options = array())
	{
		if (!empty($options)) {
			if ($options instanceof Traversable) {
				$options = ArrayUtils::iteratorToArray($options);
			} elseif (!is_array($options)) {
				throw new Exception\InvalidArgumentException('The options parameter must be an array or a Traversable');
			}
			foreach ($options as $key => $value) {
				switch (strtolower($key)) {
					case 'id':
						$this->setId($value);
						break;
					case 'name':
						$this->setName($value);
						break;
					case 'email':
						$this->setEmail($value);
						break;
					case 'nameoremail':
						$this->setNameoremail($value);
						break;
					case 'password':
						$this->setPassword($value);
						break;
				}
			}
		}
	}
	
	/**
	 * 
	 * @return array
	 */
	public function toArray()
	{
		return [
			'id' => $this->getId(),
			'name' => $this->getName(),
			'email' => $this->getEmail(),
			'nameoremail' => $this->getNameoremail(),
			'password' => $this->getPassword()
		];
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
}