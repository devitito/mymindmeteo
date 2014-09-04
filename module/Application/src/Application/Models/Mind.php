<?php

namespace Application\Models;

class Mind
{
	public $id;
	public $name;
	public $email;
	public $password;

	public function exchangeArray($data)
	{
		$this->id     = (isset($data['id'])) ? $data['id'] : null;
		$this->name = (isset($data['name'])) ? $data['name'] : null;
		$this->email  = (isset($data['email'])) ? $data['email'] : null;
		$this->password  = (isset($data['password'])) ? $data['password'] : null;
	}
}