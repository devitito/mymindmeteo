

var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'session', 'dashboard', 'profile', 'statement', 'LocalStorageModule', 'googlechart']);

mindmeteo.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {

  $routeProvider.
  when('/dashboard/:mindname', {
    templateUrl: '/templates/mindmeteo/dashboard.html',
    controller: 'mindDashboardCtrl',
    resolve: {
      identity : ['identityService', '$location', function(identityService, $location) {
        var identityRequest = identityService.get();
        identityRequest.catch(function(reason) {
          $location.path('/');
        });
        return identityRequest;
      }],
    }
  }).
  when('/profile/edit', {
    templateUrl: '/templates/mindmeteo/profile/edit.html',
    controller: 'mindProfileEditCtrl',
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
  when('/climate/record', {
    templateUrl: '/templates/mindmeteo/climate/record.html',
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
  when('/statement/new', {
    templateUrl: '/templates/mindmeteo/statement/new.html',
    controller: 'mindNewStatementCtrl',
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
  when('/statement/view/:id', {
    templateUrl: '/templates/mindmeteo/statement/view.html',
    controller: 'mindViewStatementCtrl',
    resolve: {
      identity : ['identityService', '$location', function(identityService, $location) {
        var identityRequest = identityService.get();
        identityRequest.catch(function(reason) {
          $location.path('/');
        });
        return identityRequest;
      }],
      statement: [ 'statementsFactory', '$route', '$location', function(statementsFactory, $route, $location) {
        var request = statementsFactory.get({id:$route.current.params.id}).$promise;
        request.catch(function(reason) {
          $location.path('/');
        });
        return request;
      }],
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

mindmeteo.run(['$http', function($http) {
  $http.get('/csrfToken').success(function(data){
    $http.defaults.headers.common['x-csrf-token'] = data._csrf;
  });
}]);
