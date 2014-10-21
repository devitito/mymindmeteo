var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'adminControllers', 'adminServices']);

mindmeteo.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  	when('/', {
      templateUrl: '/js/partials/admin/dashboard.html',
      controller: 'dashboardCtrl'
    }).
    when('/stats', {
        templateUrl: '/js/partials/admin/stats.html',
        controller: 'statsCtrl'
      }).
    when('/sensors', {
         templateUrl: '/js/partials/admin/sensors.html',
         controller: 'sensorsCtrl'
    }).
    when('/minds', {
        templateUrl: '/js/partials/admin/minds.html',
        controller: 'mindsCtrl'
   }).
    when('/minds/edit/:mindId', {
      templateUrl: '/js/partials/mind/edit.html',
      controller: 'EditMindCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
