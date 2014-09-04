<?php
/**
 *
 * @author devitito
 *
 */

namespace Application\Entity;

use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;
use Zend\Crypt\Password\Bcrypt;

class Mind implements InputFilterAwareInterface 
{
	protected $id;
	protected $name;
	protected $email;
	protected $password;
	
	/**
	 *
	 * @var InputFilter
	 */
	private $_inputFilter;
	
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
					case 'password':
						$this->setPassword($value);
						break;
				}
			}
		}
	}
	
	/**
	 *
	 * @param InputFilterInterface $inputFilter        	
	 */
	public function setInputFilter(InputFilterInterface $inputFilter) 
	{
		$this->_inputFilter = $inputFilter;
		return $this;
	}
	
	/**
	 * Obtient les filtres de contenu
	 * 
	 * @return \Zend\InputFilter\InputFilter
	 */
	public function getInputFilter() 
	{
		if (! $this->_inputFilter) {
			$inputFilter = new InputFilter ();
			$factory = new InputFactory ();
			
			$inputFilter->add ( $factory->createInput ( array (
				'name' => 'mindname',
				'required' => true,
				'filters' => array (
					array ('name' => 'StripTags'),
					array ('name' => 'StringTrim') 
				),
				'validators' => array (
					array (
						'name' => 'StringLength',
						'options' => array (
							'encoding' => 'UTF-8',
							'min' => 1,
							'max' => 25 
						) 
					) 
				) 
			) ) );
			
			$this->setInputFilter ( $inputFilter );
		}
		
		return $this->_inputFilter;
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