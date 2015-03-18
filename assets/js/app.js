

var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'ngTable', 'guestControllers', 'guestServices', 'mindControllers', 'mindServices','adminControllers', 'adminServices', 'adminDirectives', 'googlechart', 'ui.bootstrap', 'angularMoment', 'LocalStorageModule', 'ui.router', 'angularSpinner', 'snap']);

var guestServices = angular.module('guestServices', ['ngResource']);
var mindServices = angular.module('mindServices', ['ngResource']);
var adminServices = angular.module('adminServices', ['ngResource']);
var adminControllers = angular.module('adminControllers', []);
var guestControllers = angular.module('guestControllers', []);
var mindControllers = angular.module('mindControllers', []);
var adminDirectives = angular.module('adminDirectives', []);

mindmeteo.config(['$routeProvider', '$stateProvider', 'localStorageServiceProvider', function($routeProvider, $stateProvider, localStorageServiceProvider) {


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
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/dash', {
		templateUrl: '/js/admin/partials/admin/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/stats', {
		templateUrl: '/js/admin/partials/admin/stats.html',
		controller: 'statsCtrl',
		resolve : {
			stats : ['statsFactory', '$q', function(statsFactory, $q) {
				var deferred = $q.defer();
				return statsFactory.query(deferred);
			}],
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/sensors', {
		templateUrl: '/js/admin/partials/admin/sensors.html',
		controller: 'sensorsCtrl'
	}).
	when('/administrator/sensors/new', {
		templateUrl: '/js/admin/partials/sensor/new.html',
		controller: 'NewSensorCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}],
			meteologistList: ['mindFactory', function(mindFactory) {
				return mindFactory.fetchByRole({role: 'meteologist'}).$promise;
			}]
		}
	}).
	when('/administrator/sensors/edit/:sensorId', {
		templateUrl: '/js/admin/partials/sensor/edit.html',
		controller: 'EditSensorCtrl',
		resolve: {
			sensor: ['sensorFactory', '$route', function(sensorFactory, /*$q,*/ $route) {
				return sensorFactory.get({id:$route.current.params.sensorId}).$promise;
			}],
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/minds', {
		templateUrl: '/js/admin/partials/admin/minds.html',
		controller: 'mindsCtrl',
		resolve: {
			minds: ['mindFactory', '$q', function(mindFactory, $q) {
				var deferred = $q.defer();
				mindFactory.query(
					function(data){
						deferred.resolve(data);
					}, function(errorData) {
						deferred.resolve('An error occured while retreiving the list of minds');
					});
				return deferred.promise;
			}],
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
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
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}],
			/*climat: ['statsFactory', '$route', function (statsFactory, $route) {
				return statsFactory.climate($route.current.params.mindname);
			}]*/
		}
	}).
	when('/mind/climate/record', {
		templateUrl: '/js/mind/Climate/record.html',
		controller: 'mindClimateRecordCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}],
			sensorList : ['sensorsFactory', function (sensorsFactory) {
				return sensorsFactory.listBy({field: "status", value: "approved"});
			}]
		}
	}).
	when('/administrator/minds/new', {
		templateUrl: '/js/admin/partials/mind/new.html',
		controller: 'NewMindCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
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
	when('/report/new', {
		templateUrl: '/js/mind/Report/new/new.html',
		controller: 'mindNewReportCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/reports', {
		templateUrl: '/js/admin/Reports/list/list.html',
		controller: 'ReportListCtrl',
		resolve: {
			reports: ['reportsFactory', '$q', function(reportsFactory, $q) {
				var deferred = $q.defer();
				reportsFactory.query(
					function(data){
						deferred.resolve(data);
					}, function(errorData) {
						deferred.resolve('An error occured while retreiving the list of reports');
					});
				return deferred.promise;
			}],
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}]
		}
	}).
	when('/administrator/reports/new', {
		templateUrl: '/js/admin/Reports/new/new.html',
		controller: 'NewReportCtrl',
		resolve: {
			identity : ['identityService', '$location', function(identityService, $location) {
				var identityRequest = identityService.get();
				identityRequest.catch(function(reason) {
					$location.path('/');
				});
				return identityRequest;
			}],
			meteologistList: ['mindFactory', function(mindFactory) {
				return mindFactory.fetchByRole({role: 'meteologist'}).$promise;
			}]
		}
	}).
	otherwise({
		redirectTo: '/'
	});



	localStorageServiceProvider
	.setPrefix('mindmeteo')
	.setNotify(true, true);
}]);

mindmeteo.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart'],
        language: 'fr'
    }
});

mindmeteo.run(['$http', '$anchorScroll', function($http, $anchorScroll/*, $rootScope, $location*/) {
    $http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
    });

		$anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels

	/*$rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
    console.log("failed to change routes");
		console.log(	eventObj);
		console.log(event);
		//$location.path('/');
  });*/
}]);
