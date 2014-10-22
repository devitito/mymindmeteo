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
        controller: 'mindsCtrl',
        resolve: {
      	  minds: function(mindFactory, $q) {
      		  var deferred = $q.defer();
      		  mindFactory.query(
	      		  function(data){
	      			  deferred.resolve(data); 
	      		  }, function(errorData) {
	      			  deferred.reject(); // you could optionally pass error data here
	      	});
      		return deferred.promise;
      	  }
        }
   }).
    when('/minds/edit/:mindId', {
      templateUrl: '/js/partials/mind/edit.html',
      controller: 'EditMindCtrl',
      resolve: {
    	  mind: function(mindFactory, $q, $route) {
    		  var deferred = $q.defer();
    		  mindFactory.get({id:$route.current.params.mindId},
    		  function(data){
    			  deferred.resolve(data); 
    		  }, function(errorData) {
    			  deferred.reject(); // you could optionally pass error data here
    		  });
    		  return deferred.promise;
    	  }
      }
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
