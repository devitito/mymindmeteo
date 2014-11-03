<?php

namespace Application\Entity;

use Zend\ServiceManager\ServiceManager;

interface IndexableInterface
{
	public function toIndexable(ServiceManager $serviceManager);
	
	public function getId();
}