<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Entity(repositoryClass="Application\Entity\Repository\SensorRepository")
 * @ORM\Table(name="sensors")
 *
 */
class Sensor implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="string", length=32, nullable=false, unique=true)
	 * @ORM\GeneratedValue(strategy="NONE")
	 */
	protected $id;
	
	/**
	 * @ORM\Column(name="label", type="string", length=128, nullable=false, unique=true)
	 */
	protected $label;
	
	/**
	 * @ORM\Column(name="img", type="string", length=128, nullable=true, unique=false)
	 */
	protected $img;
	
	/**
	 * @ORM\Column(name="topic", type="string", length=64, nullable=false, unique=false)
	 */
	protected $topic;
	
	/**
	 * @ORM\Column(name="meteologist", type="string", length=64, nullable=false, unique=false)
	 */
	protected $meteologist;
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id = $value;
		return $this;
	}
	
	public function getLabel()
	{
		return $this->label;
	}
	
	public function setLabel($value)
	{
		$this->label = $value;
		return $this;
	}
	
	public function getImg()
	{
		return $this->img;
	}
	
	public function setImg($value)
	{
		$this->img = $value;
		return $this;
	}
	
	public function getTopic()
	{
		return $this->topic;
	}
	
	public function setTopic($value)
	{
		$this->topic = $value;
		return $this;
	}
	
	public function getMeteologist()
	{
		return $this->meteologist;
	}
	
	public function setMeteologist($value)
	{
		$this->meteologist = $value;
		return $this;
	}
}