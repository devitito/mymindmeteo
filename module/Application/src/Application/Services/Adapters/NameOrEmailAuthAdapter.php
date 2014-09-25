<?php
namespace Application\Services\Adapters;

use Zend\Authentication\Result as AuthenticationResult;
use Zend\Authentication\Adapter\DbTable\AbstractAdapter;
use Zend\Authentication\Adapter\DbTable\CallbackCheckAdapter;
use Zend\Db\Adapter\Adapter as DbAdapter;
use Zend\Db\Sql;
use Zend\Db\Sql\Predicate\Operator as SqlOp;
use Zend\Db\Sql\Predicate;

class NameOrEmailAuthAdapter extends CallbackCheckAdapter
{
	protected $identityColumns = [];
	
	/**
     * __construct() - Sets configuration options
     *
     * @param DbAdapter $zendDb
     * @param string    $tableName                    Optional
     * @param array     $identityArray                Optional
     * @param string    $credentialColumn             Optional
     * @param callable  $credentialValidationCallback Optional
     */
	public function __construct(DbAdapter $zendDb,
        						$tableName = null,
        						$identityArray = null,
        						$credentialColumn = null,
        						$credentialValidationCallback = null) 
	{
		$this->zendDb = $zendDb;
		
		if (null !== $tableName) {
			$this->setTableName($tableName);
		}
		
		if (!empty($identityArray)) {
			foreach($identityArray as $identityColumn) {
				$this->identityColumns [] = $identityColumn;
			}
		}
		
		if (null !== $credentialColumn) {
			$this->setCredentialColumn($credentialColumn);
		}
		
		if (null !== $credentialValidationCallback) {
			$this->setCredentialValidationCallback($credentialValidationCallback);
		} else {
			$this->setCredentialValidationCallback(function ($a, $b) {
				return $a === $b;
			});
		}
	}

	/**
	 * _authenticateSetup() - This method abstracts the steps involved with
	 * making sure that this adapter was indeed setup properly with all
	 * required pieces of information.
	 *
	 * @throws Exception\RuntimeException in the event that setup was not done properly
	 * @return bool
	 */
	protected function authenticateSetup()
	{
		$exception = null;
	
		if ($this->tableName == '') {
			$exception = 'A table must be supplied for the DbTable authentication adapter.';
		} elseif (empty($this->identityColumns)) {
			$exception = 'At least an identity column must be supplied for the DbTable authentication adapter.';
		} elseif ($this->credentialColumn == '') {
			$exception = 'A credential column must be supplied for the DbTable authentication adapter.';
		} elseif ($this->identity == '') {
			$exception = 'A value for the identity was not provided prior to authentication with DbTable.';
		} elseif ($this->credential === null) {
			$exception = 'A credential value was not provided prior to authentication with DbTable.';
		}
	
		if (null !== $exception) {
			throw new Exception\RuntimeException($exception);
		}
	
		$this->authenticateResultInfo = array(
				'code'     => AuthenticationResult::FAILURE,
				'identity' => $this->identity,
				'messages' => array()
		);
	
		return true;
	}
	
	/**
     * _authenticateCreateSelect() - This method creates a Zend\Db\Sql\Select object that
     * is completely configured to be queried against the database.
     *
     * @return Sql\Select
     */
    protected function authenticateCreateSelect()
    {
    	//where
    	$predicate = [];
    	foreach ($this->identityColumns as $identityColumn) {
    		$predicate[] = new SqlOp($identityColumn, '=', $this->identity);
    	}
    	
        // get select
        $dbSelect = clone $this->getDbSelect();
        $dbSelect->from($this->tableName)
            ->columns(array(Sql\Select::SQL_STAR))
        	->where($predicate, Predicate\PredicateSet::OP_OR);
            
        return $dbSelect;
    }
}

