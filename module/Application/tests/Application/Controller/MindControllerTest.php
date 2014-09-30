<?php

namespace Application\Controller;

use Application\TestCase;
use Zend\Mvc\Router\Http\TreeRouteStack as HttpRouter;
use Zend\Http\Request;
use Zend\Http\Response;
use Zend\Mvc\MvcEvent;
use Zend\Mvc\Router\RouteMatch;
use Application\Entity\Mind;

class MindControllerTest extends TestCase
{
	protected $instance;
	protected $request;
	protected $response;
	protected $routeMatch;
	protected $event;
	protected $em;
	
	protected function setUp()
	{
		$this->instance = new MindController();
		$this->request    = new Request();
		$this->routeMatch = new RouteMatch(array('controller' => 'Application\Controller\Mind'));
		$this->event      = new MvcEvent();
		$config = self::getApplication()->getServiceManager()->get('Config');
		$routerConfig = isset($config['router']) ? $config['router'] : array();
		$router = HttpRouter::factory($routerConfig);
	
		$this->event->setRouter($router);
		$this->event->setRouteMatch($this->routeMatch);
		$this->instance->setEvent($this->event);
		$this->instance->setServiceLocator(self::getApplication()->getServiceManager());
		
		$this->em = self::getApplication()->getServiceManager()->get('doctrine.entitymanager.orm_default');
	}
	
	public function tearDown()
	{
		self::getApplication()->getServiceManager()->setAllowOverride(true);
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $this->em);
	}
	
	private function mockEntityManager($response)
	{
		$rep = $this->getMockBuilder('Doctrine\ORM\EntityRepository')
					->disableOriginalConstructor()
					->getMock();
		$rep->expects($this->once())
			->method('findOneBy')
			->with(['name' => 'amindname'])
			->will($this->returnValue($response));
		
		$em = $this->getMockBuilder('Doctrine\ORM\EntityManager')
					->disableOriginalConstructor()
					->getMock();
		$em->expects($this->once())
			->method('getRepository')
			->with('Application\Entity\Mind')
			->will($this->returnValue($rep));
		
		self::getApplication()->getServiceManager()->setAllowOverride(true);
		self::getApplication()->getServiceManager()->setService('doctrine.entitymanager.orm_default', $em);
	}
	
	public function testDashboardActionRespond200WithIdentifiedMindAccessingHisPage()
	{
		$this->routeMatch->setParam('action', 'dashboard');
		$this->routeMatch->setParam('mindname', 'amindname');
	
		$date = new \DateTime("now");
		$data = ['id' => 'someid', 'name' => 'amindname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => $date];
		
		$this->mockEntityManager(new Mind($data));
		
		//Mock identity plugin
		$authMock = $this->getMock('\Zend\Mvc\Controller\Plugin\Identity');
		$authMock->expects($this->any())
				->method('__invoke')
				->will($this->returnValue(new Mind($data)));
		
		$this->instance->getPluginManager()->setService('identity', $authMock);
		
		$result   = $this->instance->dispatch($this->request);
		$response = $this->instance->getResponse();
	
		$this->assertEquals(200, $response->getStatusCode());
	}
	
	public function testDashboardActionRedirectToLoginIfUnidentifiedWantsToAccessAMindPublicPage()
	{
		$this->routeMatch->setParam('action', 'dashboard');
		$this->routeMatch->setParam('mindname', 'amindname');
		
		$date = new \DateTime("now");
		$data = ['id' => 'someid', 'name' => 'amindname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => $date];
		
		$this->mockEntityManager(new Mind($data));
		
		//Mock identity plugin
		$authMock = $this->getMock('\Zend\Mvc\Controller\Plugin\Identity');
		$authMock->expects($this->any())
				->method('__invoke')
				->will($this->returnValue(null));
		
		$this->instance->getPluginManager()->setService('identity', $authMock);
		
		$result   = $this->instance->dispatch($this->request);
		$response = $this->instance->getResponse();
		
		$this->assertEquals(302, $response->getStatusCode());
		$this->assertEquals('/login', $response->getHeaders()->get('Location')->getUri());
	}
	
	public function testDashboardActionRedirectToAMindPublicPageIfIdentifiedWantsToAccessAMindPublicPage()
	{
		$this->routeMatch->setParam('action', 'dashboard');
		$this->routeMatch->setParam('mindname', 'amindname');
	
		$date = new \DateTime("now");
		$data = ['id' => 'someid', 'name' => 'amindname', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => $date];
	
		$this->mockEntityManager(new Mind($data));
	
		//Mock identity plugin
		$identity = ['id' => 'someotherid', 'name' => 'anidentity', 'password' => 'aapassword', 'email' => 'anemail', 'nameoremail' => null, 'joindate' => $date];
		$authMock = $this->getMock('\Zend\Mvc\Controller\Plugin\Identity');
		$authMock->expects($this->any())
				->method('__invoke')
				->will($this->returnValue(new Mind($identity)));
	
		$this->instance->getPluginManager()->setService('identity', $authMock);
	
		$result   = $this->instance->dispatch($this->request);
		$response = $this->instance->getResponse();
	
		$this->assertEquals(302, $response->getStatusCode());
		$this->assertEquals('/amindname/public', $response->getHeaders()->get('Location')->getUri());
	}
	
	public function testDashboardActionRedirectTo404IfSomeoneAttemptToAccessPublicPageOfUnknownMind()
	{
		$this->routeMatch->setParam('action', 'dashboard');
		$this->routeMatch->setParam('mindname', 'amindname');
	
		$this->mockEntityManager(null);
	
		$result   = $this->instance->dispatch($this->request);
		$response = $this->instance->getResponse();
	
		$this->assertEquals(404, $response->getStatusCode());
	}
}