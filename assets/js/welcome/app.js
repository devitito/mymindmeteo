

var welcome = angular.module('welcome', ['ngRoute', 'guest', 'LocalStorageModule', 'underscore']);

welcome.config(['$routeProvider', 'localStorageServiceProvider', '$provide', function($routeProvider, localStorageServiceProvider, $provide) {
  $routeProvider.
	when('/', {
		template: JST['assets/templates/welcome/partials/homepage.html'],
		controller: 'guestCtrl'
	}).
	when('/session/new', {
		template: JST['assets/templates/welcome/partials/signup.html'],
		controller: 'newSessionCtrl'
	}).
	when('/register', {
		template: JST['assets/templates/welcome/partials/register.html'],
		controller: 'guestRegCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});

  localStorageServiceProvider
    .setStorageType('sessionStorage')
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

welcome.run(['$http', '$anchorScroll', function($http, $anchorScroll) {
  $http.get('/csrfToken').success(function(data){
    $http.defaults.headers.common['x-csrf-token'] = data._csrf;
  });

  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);
