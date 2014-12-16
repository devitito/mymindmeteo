/**
 *
 *
 */
describe("Mind.EditController", function() {
	var EditController;
	var flash;
	var $controller;
	var $scope;

	beforeEach(function () {
		module('adminControllers');
		module('adminServices');
		module('angularMoment');
		module('ui.bootstrap');
	});

	beforeEach(inject(function(_$controller_, _flash_) {
		$controller = _$controller_;
		$scope = {};
		flash = _flash_;

		spyOn(flash, 'setMessage');
	}));

	it("Should push an error message in flash messenger if $scope.mind is not an object", function() {
			EditController = $controller('EditMindCtrl', { $scope: $scope, mind: 'an error message', identity: {id: 1}});
			expect(flash.setMessage).toHaveBeenCalledWith('an error message');
			expect($scope.flash).toBeDefined();
			//expect($scope.flash.getMessage()).toBe('an error message');
	  });
});


