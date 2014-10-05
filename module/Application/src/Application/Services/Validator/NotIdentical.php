<?php

namespace Application\Services\Validator;

use Zend\Validator\Identical;

class NotIdentical extends Identical
{
	const SAME      = 'Same';
	
	/**
	 * Error messages
	 * @var array
	 */
	protected $messageTemplates = array(
			self::SAME      => "The two given tokens are identical",
			self::MISSING_TOKEN => 'No token was provided to match against',
	);
	
	public function isValid($value, array $context = null)
	{
		if (parent::isValid($value, $context)) {
			$this->error(self::SAME);
			return false;
		}
		return true;
	}
}
