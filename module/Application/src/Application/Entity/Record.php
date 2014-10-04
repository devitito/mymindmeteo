<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Entity(repositoryClass="Application\Entity\Repository\RecordRepository")
 * @ORM\Table(name="records")
 *
 */
class Record implements \ArrayAccess
{
	use EntitiesArrayAccessTrait;
	
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="string", length=32, nullable=false, unique=true)
	 * @ORM\GeneratedValue(strategy="NONE")
	 */
	protected $id;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Application\Entity\Mind")
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $mind;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Application\Entity\Sensor")
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $sensor;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Application\Entity\Sample")
	 * @ORM\JoinColumn(nullable=false)
	 */
	protected $sample;
	
	/**
	 * @ORM\Column(name="date", type="utcdatetime", nullable=false, unique=false)
	 */
	protected $date;
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setId($value)
	{
		$this->id = $value;
		return $this;
	}
	
	public function getMind()
	{
		return $this->mind;
	}
	
	public function setMind($value)
	{
		$this->mind = $value;
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
	
	public function getSample()
	{
		return $this->sample;
	}
	
	public function setSample(Sample $value)
	{
		$this->sample = $value;
		return $this;
	}
	
	public function getDate()
	{
		if ($this->date) {
			$this->date->setTimezone(new \DateTimeZone($this->getMind()->getTimezone()));
		}
		return $this->date;
	}
	
	public function setDate($value)
	{
		$this->date = $value;
		return $this;
	}
}