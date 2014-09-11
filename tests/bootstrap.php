<?php
use Application\TestCase;

chdir(dirname(__DIR__));

include 'init_autoloader.php';

$application = Zend\Mvc\Application::init(include 'config/application.config.php');

// load application specific test case
require 'helpers/TestCase.php';

TestCase::setApplication($application);