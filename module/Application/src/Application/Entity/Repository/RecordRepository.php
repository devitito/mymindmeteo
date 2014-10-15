<?php
/**
 * MindMeteo
 * 
 */

namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * RecordRepository
 *
 * Repository class to extend Doctrine ORM functions 
 *
 */
class RecordRepository extends EntityRepository
{
	public function fetchUnIndexed()
	{
		$qb = $this->createQueryBuilder('r');
		$qb->where('r.date <= :start')
			->setParameters(array('start' => new \DateTime('2014-10-13')));
		
		return $qb->getQuery()->getResult();
	}
}
