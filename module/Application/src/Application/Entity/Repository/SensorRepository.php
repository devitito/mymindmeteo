<?php
/**
 * MindMeteo
 * 
 */

namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * SensorRepository
 *
 * Repository class to extend Doctrine ORM functions 
 *
 */
class SensorRepository extends EntityRepository
{
	//get a sensor randomly
	public function findRandom()
	{
		$count = $this->createQueryBuilder('s')
						->select('count(s)')
						->getQuery()
						->getSingleScalarResult();
		
		$id = rand(1, $count);
		return $this->find($id);
	}
}
