

var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'ngTable', 'guestControllers', 'guestServices', 'mindControllers', 'adminControllers', 'adminServices', 'adminDirectives', 'googlechart', 'ui.bootstrap', 'angularMoment', 'LocalStorageModule', 'ui.router']);

var guestServices = angular.module('guestServices', ['ngResource']);
var guestControllers = angular.module('guestControllers', []);
var mindControllers = angular.module('mindControllers', []);

mindmeteo.config(function($routeProvider, localStorageServiceProvider) {
  $routeProvider.
  	/*when('/', {
      templateUrl: '/js/admin/partials/admin/dashboard.html',
      controller: 'dashboardCtrl',
			resolve: {
				identity: function(identityService, $q) {
					var deferred = $q.defer();
					return identityService.get(deferred);
				}
			}
    }).*/
	when('/', {
		templateUrl: '/js/guest/partials/homepage.html',
		controller: 'homepageCtrl'
	}).
	when('/session/new', {
		templateUrl: '/js/guest/partials/session/new.html',
		controller: 'newSessionCtrl'
	}).
	when('/administrator', {
		templateUrl: '/js/admin/partials/admin/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/administrator/dash', {
		templateUrl: '/js/admin/partials/admin/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/administrator/stats', {
		templateUrl: '/js/admin/partials/admin/stats.html',
		controller: 'statsCtrl',
		resolve : {
			stats : function(statsFactory, $q) {
				var deferred = $q.defer();
				return statsFactory.query(deferred);
			},
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/administrator/sensors', {
		templateUrl: '/js/admin/partials/admin/sensors.html',
		controller: 'sensorsCtrl'
	}).
	when('/sensors/edit/:sensorId', {
		templateUrl: '/js/admin/partials/sensor/edit.html',
		controller: 'EditSensorCtrl',
		resolve: {
			sensor: function(sensorFactory, $q, $route) {
				var deferred = $q.defer();
				sensorFactory.get({id:$route.current.params.sensorId}, function(data){
					deferred	.resolve(data);
				}, function(errorData) {
					deferred.resolve('An error occured while retreiving the requested data');
				});
				return deferred.promise;
			},
			identity : function(identityService) {
				return identityService.get();
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
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/error', {
		templateUrl: '/js/admin/partials/admin/error.html',
	}).
	when('/mind/new', {
		templateUrl: '/js/guest/partials/mind/new.html',
		controller: 'guestRegistrationCtrl'
	}).
	when('/mind/dashboard/:mindname', {
		templateUrl: '/js/mind/partials/dashboard.html',
		controller: 'mindDashboardCtrl',
		resolve: {
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/minds/new', {
		templateUrl: '/js/admin/partials/mind/new.html',
		controller: 'NewMindCtrl',
		resolve: {
			identity : function(identityService) {
				return identityService.get();
			}
		}
	}).
	when('/minds/edit/:mindId', {
		templateUrl: '/js/admin/partials/mind/edit.html',
		controller: 'EditMindCtrl',
		resolve: EditMindCtrl.resolve
	}).
	when('/result/:object/:id/:result', {
		templateUrl: '/js/admin/partials/admin/edited.html',
		controller: 'ResultCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});

	localStorageServiceProvider
	.setPrefix('mindmeteo')
	.setNotify(true, true);
});

mindmeteo.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart'],
        language: 'fr'
    }
});

mindmeteo.run(function($http) {
    $http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
    });
});
