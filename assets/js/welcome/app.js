

var welcome = angular.module('welcome', ['ngRoute', 'guest', 'mindServices', 'adminServices']);

var mindServices = angular.module('mindServices', ['ngResource']);
var adminServices = angular.module('adminServices', ['ngResource']);

welcome.config(['$routeProvider', function($routeProvider) {

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
}]);

welcome.run(['$http', '$anchorScroll', function($http, $anchorScroll) {
    $http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
    });

    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);
