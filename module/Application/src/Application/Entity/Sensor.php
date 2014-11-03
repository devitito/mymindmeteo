<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\ServiceManager\ServiceManager;

/**
 *
 * @ORM\Entity(repositoryClass="Application\Entity\Repository\SensorRepository")
 * @ORM\Table(name="sensors")
 *
 */
class Sensor implements \ArrayAccess, IndexableInterface
{
	use EntitiesArrayAccessTrait;
	
	/**
	 * @ORM\Id
	 * @ORM\Column(name="id", type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
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
	
	public function toIndexable(ServiceManager $serviceManager)
	{
		$samples = $serviceManager->get('doctrine.entitymanager.orm_default')->getRepository('Application\Entity\Sample')->findBy(['sensor' => $this->getId()]);
		$sampleArray= [];
		foreach($samples as $sample) {
			$sampleArray [] = ['id' => $sample->getId(), 'label' => $sample->getLabel(), 'value' => $sample->getValue()];
		}
		
		return array(
			'id'      => $this->getId(),
			'topic' => $this->getTopic(),
			'label' => $this->getLabel(),
			'meteologist' => $this->getMeteologist(),
			'tstamp'  => (new \DateTime("now"))->format('Y-m-d H:i:s'),
			'samples' => $sampleArray
		);
	}
}