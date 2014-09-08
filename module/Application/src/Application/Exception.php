<?php

namespace Application;

class Exception extends \Exception
{
	const REGISTRATION_FAILED = 1;

	static protected $messages = array(
		self::REGISTRATION_FAILED => 'We couldn\'t register you right now. Please try again later.',
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