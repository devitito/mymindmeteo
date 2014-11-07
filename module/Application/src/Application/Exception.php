<?php

namespace Application;

class Exception extends \Exception
{
	const REGISTRATION_FAILED = 1;
	const LOGIN_FAILED = 2;
	const UNKNOWN_MIND = 3;
	const OPERATION_FAILED = 4;
	const UNKNOWN_TYPE = 5;
	const UNKNOWN_REQUEST = 6;
	const REQUEST_FAILED = 7;
	const DO_QUERY_FAILED = 8;
	const DO_PARSE_FAILED = 9;

	static protected $messages = array(
		self::REGISTRATION_FAILED => 'We couldn\'t register you right now. Please try again later.',
		self::LOGIN_FAILED => 'We couldn\'t log you in right now. Please try again later.',
		self::UNKNOWN_MIND => 'We couldn\'t identify you right now. Please try again later.',
		self::OPERATION_FAILED => 'We couldn\'t complete the operation. Please try again later.',
		self::UNKNOWN_TYPE => 'We couldn\'t index your document (type unknwon). Please try again later.',
		self::UNKNOWN_REQUEST => 'There is no adapter for the requested statistic.',
		self::REQUEST_FAILED => 'Collecting the requested statistic failed.',
		self::DO_QUERY_FAILED => 'Failed to assemble the search query.',
		self::DO_PARSE_FAILED => 'Failed to parse the search results.',
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