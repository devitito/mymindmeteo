<?php

namespace Application;

class Exception extends \Exception
{
	const REGISTRATION_FAILED = 1;
	const LOGIN_FAILED = 2;
	const UNKNOWN_MIND = 3;
	const OPERATION_FAILED = 4;

	static protected $messages = array(
		self::REGISTRATION_FAILED => 'We couldn\'t register you right now. Please try again later.',
		self::LOGIN_FAILED => 'We couldn\'t log you in right now. Please try again later.',
		self::UNKNOWN_MIND => 'We couldn\'t identify you right now. Please try again later.',
		self::OPERATION_FAILED => 'We couldn\'t complete the operation. Please try again later.',
	);
	
	static public function factory ($code, $previous = null) 
	{
		return new Exception(static::getCustomMessage($code), $code, $previous);
	}
	
	static public function getCustomMessage($code)
	{
		return isset(static::$messages[$code]) ? static::$messages[$code] : 'unknown error';
	}
}