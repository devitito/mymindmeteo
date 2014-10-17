<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Application\Entity\Mind;
use Zend\I18n\View\Helper\DateFormat;
use IntlDateFormatter;

class AdminController extends AbstractActionController
{
	public function mindListAction()
	{
		$identity = $this->identity();
		if (!$identity) {
			return $this->redirect()->toUrl('/');
		}
		
		$mindManager = $this->getServiceLocator()->get('mind-manager');
		try{
			$data = [];
			$minds = $mindManager->fetchAll();
			foreach ($minds as $mind) {
				$dateformat = new DateFormat();
				$date = $dateformat($mind->getJoindate(), IntlDateFormatter::MEDIUM, IntlDateFormatter::NONE, $identity->getLocale());
				$data [] = ['name' => $mind->getName(), 'joindate' => $date , 'role' => $mind->getRole()];
			}
			return new JsonModel($data);
		} catch (Exception $e) {
			
		}
		/*try {
			$mindManager = $this->getServiceLocator()->get('mind-manager');
			$isAvailable = $mindManager->isAvailable(['name' => $_POST['name']]);
			$variables = array( 'valid' => $isAvailable);
		}
		catch (\Exception $e) {
			$variables = array( 'valid' => 'false', 'message' => 'Sorry, we can\'t check the avaibility of your mind name right now. Try again later.');
		}
		
		$json = new JsonModel( $variables );
		return $json;*/
	}
}