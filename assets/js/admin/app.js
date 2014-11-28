var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'ngTable', 'adminControllers', 'adminServices', 'adminDirectives', 'googlechart', 'ui.bootstrap']);

mindmeteo.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  	when('/', {
      templateUrl: '/js/admin/partials/admin/dashboard.html',
      controller: 'dashboardCtrl'
    }).
    when('/dash', {
        templateUrl: '/js/admin/partials/admin/dashboard.html',
        controller: 'dashboardCtrl'
    }).
    when('/stats', {
        templateUrl: '/js/admin/partials/admin/stats.html',
        controller: 'statsCtrl',
        resolve : {
        	stats : function(statsFactory, $q) {
	    		var deferred = $q.defer();
	    		return statsFactory.query(deferred);
        	},
    		identity: function(identityService, $q) {
    			var deferred = $q.defer();
    			return identityService.get(deferred);
    		}
        }
      }).
    when('/sensors', {
         templateUrl: '/js/admin/partials/admin/sensors.html',
         controller: 'sensorsCtrl'
    }).
    when('/sensors/edit/:sensorId', {
        templateUrl: '/js/admin/partials/sensor/edit.html',
        controller: 'EditSensorCtrl',
        resolve: {
        	sensor: function(sensorFactory, $q, $route) {
        		  var deferred = $q.defer();
        		  sensorFactory.get({id:$route.current.params.sensorId},
        			  function(data){
        				  deferred.resolve(data);
        			  }, function(errorData) {
        				  deferred.resolve('An error occured while retreiving the requested data');
        		});
        		return deferred.promise;
        	  },
        	  identity: function(identityService, $q) {
        			var deferred = $q.defer();
        			return identityService.get(deferred);
        	  }
        }
   }).
    when('/minds', {
        templateUrl: '/js/admin/partials/admin/minds.html',
        controller: 'mindsCtrl',
        resolve: {
        	minds: function(mindFactory, $q) {
	    		var deferred = $q.defer();
	    		mindFactory.query(
	    			function(data){
	    				deferred.resolve(data);
	    			}, function(errorData) {
	    				deferred.resolve('An error occured while retreiving the list of minds');
	    			});
	    		return deferred.promise;
        	},
    		identity: function(identityService, $q) {
    			var deferred = $q.defer();
    			return identityService.get(deferred);
    		}
        }
   }).
   when('/minds/new', {
       templateUrl: '/js/admin/partials/mind/new.html',
       controller: 'NewMindCtrl',
       resolve: {
    	   identity: function(identityService, $q) {
    			var deferred = $q.defer();
    			return identityService.get(deferred);
    		}
       }
  }).
    when('/minds/edit/:mindId', {
      templateUrl: '/js/admin/partials/mind/edit.html',
      controller: 'EditMindCtrl',
      resolve: EditMindCtrl.resolve
    }).
    when('/edited/result/:object/:id/:result', {
        templateUrl: '/js/admin/partials/admin/edited.html',
        controller: 'EditedCtrl'
    }).
    when('/deleted/:object/:id/:result', {
        templateUrl: '/js/admin/partials/admin/edited.html',
        controller: 'DeletedCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

mindmeteo.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart'],
        language: 'fr'
    }
});
