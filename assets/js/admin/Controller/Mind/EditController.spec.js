/**
 *
 *
 */
describe("Mind.EditController", function() {
	var EditController;
	var flash;
	var $controller;
	var $scope;
	var $rootScope;

	beforeEach(function () {
		module('adminControllers');
		module('adminServices');
		module('angularMoment');
		module('ui.bootstrap');
	});

	beforeEach(inject(function(_$controller_, _$rootScope_, _flash_) {
		$controller = _$controller_;
		$scope = {};
		$rootScope = _$rootScope_;
		flash = _flash_;
	}));

	it("Should push an error message in flash messenger if $scope.mind is not an object", function(done) {
		$rootScope.$on('$routeChangeSuccess', function () {
			expect($scope.flash.getMessage()).toBe('an error message');
			return done();
		});

		EditController = $controller('EditMindCtrl', { $scope: $scope, mind: 'an error message', identity: {id: 1}});
		//The message will be available when $routeChangeSuccess event is triggered
		$rootScope.$broadcast('$routeChangeSuccess', {});
	});

	it("Shouldn't push an error message in flash messenger if $scope.mind is an object", function(done) {
		$rootScope.$on('$routeChangeSuccess', function () {
			expect($scope.flash).toBeUndefined();
			return done();
		});

		EditController = $controller('EditMindCtrl', { $scope: $scope, mind: {id:1, name: 'a-name', email:'anemail@domain.ext'}, identity: {id: 1}});
		//$routeChangeSuccess is normaly triggered when view and controller are loaded
		$rootScope.$broadcast('$routeChangeSuccess', {});
	});
});


