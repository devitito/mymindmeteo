

var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'ngTable', 'guestControllers', 'guestServices', 'mindControllers', 'adminControllers', 'adminServices', 'adminDirectives', 'googlechart', 'ui.bootstrap', 'angularMoment', 'LocalStorageModule', 'ui.router']);

var adminServices = angular.module('adminServices', ['ngResource']);
var guestServices = angular.module('guestServices', ['ngResource']);
var guestControllers = angular.module('guestControllers', []);
var mindControllers = angular.module('mindControllers', []);

mindmeteo.config(function($routeProvider, $stateProvider, localStorageServiceProvider) {


	/*$stateProvider
    .state('admin', {
      url: "/administrator",
			views: {
        "menu": { templateUrl: "/js/admin/partials/admin/admin.menu.html" },
        "dashboard": { templateUrl: "/js/admin/partials/admin/dashboard.html" }
      }
    });*/

	/*$stateProvider
    .state('dashboard', {
      url: "/administrator#/dash",
      templateUrl: "/js/admin/partials/admin/dashboard.html",
			controller: 'dashboardCtrl',
			resolve: {
				identity : function(identityService) {
					return identityService.get();
				}
			}
    });*/

  $routeProvider.
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
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/administrator/dash', {
		templateUrl: '/js/admin/partials/admin/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
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
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/administrator/sensors', {
		templateUrl: '/js/admin/partials/admin/sensors.html',
		controller: 'sensorsCtrl'
	}).
	when('/administrator/sensors/edit/:sensorId', {
		templateUrl: '/js/admin/partials/sensor/edit.html',
		controller: 'EditSensorCtrl',
		resolve: {
			sensor: function(sensorFactory, /*$q,*/ $route) {
				//var deferred = $q.defer();
				return sensorFactory.get({id:$route.current.params.sensorId}).$promise;
				/*, function(data){
					deferred.resolve(data);
				}, function(errorData) {
					deferred.resolve('An error occured while retreiving the requested data');
				});
				return deferred.promise;*/
			},
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/administrator/minds', {
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
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/mind/new', {
		templateUrl: '/js/guest/partials/mind/new.html',
		controller: 'guestRegCtrl'
	}).
	when('/mind/dashboard/:mindname', {
		templateUrl: '/js/mind/partials/dashboard.html',
		controller: 'mindDashboardCtrl',
		resolve: {
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/administrator/minds/new', {
		templateUrl: '/js/admin/partials/mind/new.html',
		controller: 'NewMindCtrl',
		resolve: {
			identity : function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}
		}
	}).
	when('/administrator/minds/edit/:mindId', {
		templateUrl: '/js/admin/partials/mind/edit.html',
		controller: 'EditMindCtrl',
		resolve: EditMindCtrl.resolve
	}).
	when('/administrator/result/:object/:id/:result', {
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

mindmeteo.run(function($http/*, $rootScope, $location*/) {
    $http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
    });

	/*$rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
    console.log("failed to change routes");
		console.log(	eventObj);
		console.log(event);
		//$location.path('/');
  });*/
});
