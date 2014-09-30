<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use Application\Entity\Sensor;

/**
 *
 * @ORM\Entity(repositoryClass="Application\Entity\Repository\SampleRepository")
 * @ORM\Table(name="samples")
 *
 */
class Sample implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="string", length=32, nullable=false, unique=true)
	 * @ORM\GeneratedValue(strategy="NONE")
	 */
	protected $id;
	
	/**
	 * @ORM\Column(name="label", type="string", length=32, nullable=false, unique=false)
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
	 * @ORM\Column(name="value", type="integer", nullable=false, unique=false)
	 */
	protected $value;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Application\Entity\Sensor", cascade={"persist", "remove"})
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $sensor;
	
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
	
	public function getValue()
	{
		return $this->value;
	}
	
	public function setValue($value)
	{
		$this->value = $value;
		return $this;
	}
	
	public function getSensor()
	{
		return $this->sensor;
	}
	
	public function setSensor(Sensor $value)
	{
		$this->sensor = $value;
		return $this;
	}
}