

var administrator = angular.module('administrator', ['ngRoute', 'dashboard' ,'stats', 'mind']);

var mindServices = angular.module('mindServices', ['ngResource']);
var mindControllers = angular.module('mindControllers', []);
var adminDirectives = angular.module('adminDirectives', []);

administrator.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {

  $routeProvider.
	when('/', {
		templateUrl: '/templates/administrator/dashboard.html',
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
	when('/stats', {
		templateUrl: '/templates/administrator/stats.html',
		controller: 'statsCtrl',
		resolve : {
			data : ['statsFactory', '$q', function(statsFactory, $q) {
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
	/*when('/administrator/sensors', {
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
			sensor: ['sensorFactory', '$route', function(sensorFactory, $q, $route) {
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
	}).*/
	when('/minds', {
		templateUrl: '/templates/administrator/minds.html',
		controller: 'mindListCtrl',
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
	when('/minds/new', {
		templateUrl: '/templates/administrator/mind/new.html',
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
	when('/minds/edit/:mindId', {
      templateUrl: '/templates/administrator/mind/edit.html',
      controller: 'EditMindCtrl',
      resolve: {
        user: ['mindFactory', '$q', '$route', '$location', 'flash', function(mindFactory, $q, $route, $location, flash) {
          var mindRequest = mindFactory.get({id:$route.current.params.mindId}).$promise;
          mindRequest.catch(function(reason) {
            flash.setMessage(reason.data);
            $location.path('/result/minds/0/1');
          });
          return mindRequest;
        }],
        identity: ['identityService', '$location', function(identityService, $location) {
          var identityRequest = identityService.get();
          identityRequest.catch(function(reason) {
            $location.path('/');
          });
          return identityRequest;
        }]
      }
	}).
	when('/result/:object/:id/:result', {
		templateUrl: '/templates/administrator/edited.html',
		controller: 'ResultCtrl'
	}).
	/*when('/administrator/reports', {
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
	}).*/
	otherwise({
		redirectTo: '/'
  });

  localStorageServiceProvider
	.setPrefix('mindmeteo')
	.setNotify(true, true);
}]);

administrator.value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
        packages: ['corechart'],
        language: 'fr'
    }
});

administrator.run(['$http', '$anchorScroll', function($http) {
  $http.get('/csrfToken').success(function(data){
    $http.defaults.headers.common['x-csrf-token'] = data._csrf;
  });
}]);
