<?php

namespace Application\Entity;

interface IndexableInterface
{
	public function toIndexable();
	
	public function getId();
}