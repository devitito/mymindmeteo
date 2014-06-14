<?php
namespace Application\Entity;

use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

class Mind implements InputFilterAwareInterface
{
	/**
	 * @var InputFilter
	 */
	private $_inputFilter;
	
	/**
	 * @param InputFilterInterface $inputFilter
	 */
	public function setInputFilter(InputFilterInterface $inputFilter)
	{
		$this->_inputFilter = $inputFilter;
		return $this;
	}
	 
	/**
	 * Obtient les filtres de contenu
	 * @return \Zend\InputFilter\InputFilter
	 */
	public function getInputFilter()
	{
		if (!$this->_inputFilter) {
			$inputFilter = new InputFilter();
			$factory     = new InputFactory();
			 
			$inputFilter->add($factory->createInput(array(
    			'name'     => 'mindname',
    			'required' => true,
    			'filters'  => array(
        			array('name' => 'StripTags'),
        			array('name' => 'StringTrim'),
    			),
    			'validators' => array(
        			array(
            			'name'    => 'StringLength',
            			'options' => array(
                			'encoding' => 'UTF-8',
                			'min'      => 1,
                			'max'      => 25,
            			),
					),
            	),
            )));
			 
			$this->setInputFilter($inputFilter);
		}
		 
		return $this->_inputFilter;
	}
}