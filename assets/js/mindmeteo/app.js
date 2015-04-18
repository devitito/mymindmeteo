

var mindmeteo = angular.module('mindmeteo', ['ngRoute', 'session', 'dashboard', 'profile', 'statement', 'LocalStorageModule', 'googlechart', 'underscore']);

mindmeteo.config(['$routeProvider', 'localStorageServiceProvider', '$provide', function($routeProvider, localStorageServiceProvider, $provide) {

  $routeProvider.
  when('/dashboard/:mindname', {
    template: JST['assets/templates/mindmeteo/dashboard.html'],
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
    template: JST['assets/templates/mindmeteo/profile/edit.html'],
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
    template: JST['assets/templates/mindmeteo/climate/record.html'],
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
    template: JST['assets/templates/mindmeteo/statement/new.html'],
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
    template: JST['assets/templates/mindmeteo/statement/view.html'],
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

  $provide.decorator('$templateCache', ['$delegate', '$sniffer', function($delegate, $sniffer) {
    var originalGet = $delegate.get;

    $delegate.get = function(key) {
      var value;
      value = originalGet(key);
      if (!value) {
        // JST is where my partials and other templates are stored
        // If not already found in the cache, look there...
        value = JST[key]();
        if (value) {
          $delegate.put(key, value);
        }
      }
      return value;
    };

    return $delegate;
  }]);
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
