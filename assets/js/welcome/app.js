

var welcome = angular.module('welcome', ['ngRoute', 'guest', 'LocalStorageModule']);

welcome.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  $routeProvider.
	when('/', {
		templateUrl: '/templates/welcome/partials/homepage.html',
		controller: 'guestCtrl'
	}).
	when('/session/new', {
		templateUrl: '/templates/welcome/partials/signup.html',
		controller: 'newSessionCtrl'
	}).
	when('/register', {
		templateUrl: '/templates/welcome/partials/register.html',
		controller: 'guestRegCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});

  localStorageServiceProvider
	.setPrefix('mindmeteo')
	.setNotify(true, true);
}]);

welcome.run(['$http', '$anchorScroll', function($http, $anchorScroll) {
    $http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
    });

    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);
