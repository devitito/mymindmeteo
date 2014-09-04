<?php

namespace Application\Models\DbTable;

use Zend\Db\TableGateway\TableGateway;
use Application\Models\Mind;
use Zend\Crypt\Password\Bcrypt;

class MindTable
{
	protected $tableGateway;

	public function __construct(TableGateway $tableGateway)
	{
		$this->tableGateway = $tableGateway;
	}

	public function fetchAll()
	{
		$resultSet = $this->tableGateway->select();
		return $resultSet;
	}

	public function getMind($id)
	{
		$id  = (int) $id;
		$rowset = $this->tableGateway->select(array('id' => $id));
		$row = $rowset->current();
		if (!$row) {
			throw new \Exception("Could not find row $id");
		}
		return $row;
	}

	public function saveMind(Mind $mind)
	{
		$bcrypt = new Bcrypt();
		
		$data = array(
			'name' => $mind->name,
			'email'  => $mind->email,
			'password'  => $bcrypt->create($mind->password)
		);

		$id = $mind->id;
		if ($id == null) {
			$data['id'] = uniqid();
			$this->tableGateway->insert($data);
		} else {
			if ($this->getMind($id)) {
				$this->tableGateway->update($data, array('id' => $id));
			} else {
				throw new \Exception('Mind id does not exist');
			}
		}
	}

	public function deleteMind($id)
	{
		$this->tableGateway->delete(array('id' => $id));
	}
	
	/**
	 * Verify the existence of a mind with all the given caracteristics
	 * 
	 * @param array $option
	 * @return boolean
	 */
	public function existMind(array $option)
	{
		$exist = false;
		
		foreach ($options as $key => $value) {
			$rowset = $this->tableGateway->select(array($key => $value));
			$row = $rowset->current();
			if (!$row) 
				return false;
			else 
				$exist = true;
		}
		return $exist;
	}
}