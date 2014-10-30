var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'adminControllers', 'adminServices', 'adminDirectives', 'googlechart']);

mindmeteo.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  	when('/', {
      templateUrl: '/js/partials/admin/dashboard.html',
      controller: 'dashboardCtrl'
    }).
    when('/stats', {
        templateUrl: '/js/partials/admin/stats.html',
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
       templateUrl: '/js/partials/mind/new.html',
       controller: 'NewMindCtrl',
       resolve: {
    	   identity: function(identityService, $q) {
    			var deferred = $q.defer();
    			return identityService.get(deferred);
    		}
       }
  }).
    when('/minds/edit/:mindId', {
      templateUrl: '/js/partials/mind/edit.html',
      controller: 'EditMindCtrl',
      resolve: EditMindCtrl.resolve 
    }).
    when('/minds/edited/result/:id/:result', {
        templateUrl: '/js/partials/mind/edited.html',
        controller: 'EditedMindCtrl'
    }).
    when('/minds/delete/:result', {
        templateUrl: '/js/partials/mind/edited.html',
        controller: 'EditedMindCtrl'
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
