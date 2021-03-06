

var administrator = angular.module('administrator', ['ngRoute', 'session', 'dashboard', 'stats', 'sensor', 'report', /*'helper',*/ 'mind', 'flashMsg', 'LocalStorageModule', 'googlechart']);

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
	when('/sensors', {
		templateUrl: '/templates/administrator/sensors.html',
		controller: 'sensorsCtrl'
	}).
	when('/sensors/new', {
		templateUrl: '/templates/administrator/sensor/new.html',
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
	when('/sensors/edit/:sensorId', {
		templateUrl: '/templates/administrator/sensor/edit.html',
		controller: 'EditSensorCtrl',
		resolve: {
			item: ['sensorFactory', '$route', function(sensorFactory, $route) {
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
        identity: ['identityService', '$window', function(identityService, $window) {
          var identityRequest = identityService.get();
          identityRequest.catch(function(reason) {
            $window.location.href = '/';
          });
          return identityRequest;
        }]
      }
	}).
	when('/result/:object/:id/:result', {
		templateUrl: '/templates/administrator/edited.html',
		controller: 'ResultCtrl'
	}).
	when('/reports', {
		templateUrl: '/templates/administrator/report/list.html',
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
	when('/reports/new', {
		templateUrl: '/templates/administrator/report/new.html',
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
    .setStorageType('sessionStorage')
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

administrator.run(['$http', function($http) {
  $http.get('/csrfToken').success(function(data){
    $http.defaults.headers.common['x-csrf-token'] = data._csrf;
  });
}]);
