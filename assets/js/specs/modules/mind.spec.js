/**
 *
 *
 */
describe("Mind.EditController", function() {
	var EditController, flash, lang, identityService;
	var $controller;
	var $scope;
	var $rootScope;
	var $q;
	var $location;

	beforeEach(function () {
		module('flashMsg');
        module('i18n');
		module('session');
        module('mind');
		module('angularMoment');
		module('ui.bootstrap');
		module('LocalStorageModule');
	});

	beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$location_, _flash_, _lang_, _identityService_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$location = _$location_;
		flash = _flash_;
		lang = _lang_;
		identityService = _identityService_;
	}));

	it("should call the lang service in order to fetch the list of langages available in mindmeteo", function() {
		$scope = {};
		spyOn(lang, 'list').and.callFake(function(locale) {
			return ['lang1', 'lang2'];
		});

		EditController = $controller('EditMindCtrl', { $scope: $scope, user: {id:1, name:'a-name', email: 'anemail@somewhere.som'}, identity: {locale: 'a locale'}});
		expect(lang.list).toHaveBeenCalledWith('a locale');
		expect($scope.langs).toEqual(['lang1', 'lang2']);
	});

	it("should call the identityService in order to know if the user is editing himself", function() {
		$scope = {};
		spyOn(identityService, 'isSelf').and.returnValue(true);
		EditController = $controller('EditMindCtrl', { $scope: $scope, user: {id:'anid', name:'a-name', email: 'anemail@somewhere.som'}, identity: {locale: 'a locale'}});
		expect(identityService.isSelf).toHaveBeenCalledWith('anid');
	});

	describe("update success", function() {
		var mockMindFactor;

		beforeEach(function() {
			$scope = {};
			mockMindFactory = {
				$update: function(success, error) {
					var updateResponse = {id:'46-89', name: 'a-name', email:'anupdatedemail@domain.ext'};
					if (angular.isDefined(success)) return success(updateResponse);
					else {
						var updateDeferred = $q.defer();
						updateDeferred.resolve(updateResponse);
						return {$promise: updateDeferred.promise};
					}
				},
				id: '46-89',
			};

			spyOn(mockMindFactory, '$update').and.callThrough();
			EditController = $controller('EditMindCtrl', { $scope: $scope, user: mockMindFactory, identity: {locale: 'locale'}});
		});

		it("should call mindFactory.$update", function() {
			$scope.update();
			expect(mockMindFactory.$update).toHaveBeenCalled();
		});

		it("should trigger 'mind.post.edit' event", function(done) {
			$rootScope.$on('mind.post.edit', function (event, args) {
				expect(args).toBe(mockMindFactory);
				return done();
			});
			$scope.update();
		});

		it("should redirect to the result page", function(done) {
			$scope.update();
			//$rootScope.$digest();
			expect($location.path()).toBe( '/result/minds/46-89/1' );

			$rootScope.$on('$routeChangeSuccess', function () {
				expect(flash.getMessage()).toBe('Mind updated successfully!');
				return done();
			});

			//$routeChangeSuccess is normaly triggered when view and controller are loaded
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});
	});

	describe("update error", function() {
		var mockMindFactory;

		beforeEach(function() {
			$scope = {};
			mockMindFactory = {
				$update: function(success, error) {

					if (angular.isDefined(error)) return error(this.response);
					else {
						var updateDeferred = $q.defer();
						updateDeferred.reject(this.response);
						return {$promise: updateDeferred.promise};
					}
				},
				id: '46-89'
			};
			spyOn(mockMindFactory, '$update').and.callThrough();
			EditController = $controller('EditMindCtrl', { $scope: $scope, user: mockMindFactory, identity: {locale: 'fr_FR'}});
		});

		it("should redirect to the result page in case of error", function() {
			mockMindFactory.response = 'error';
			$scope.update();
			expect($location.path()).toBe( '/result/minds/46-89/0' );
		});

		it("should parse a well formated error message", function(done) {
			mockMindFactory.response = {data: eval(angular.toJson([{recordFound:'error1'}]))};
			$rootScope.$on('$routeChangeSuccess', function () {
				expect(flash.getMessage()).toBe('error1');
				return done();
			});

			$scope.update();
			//$routeChangeSuccess is normaly triggered when view and controller are loaded
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});

		it("should return a default error message if the reponse is not formated as expected", function(done) {
			mockMindFactory.response = 'misformated error response';

			$scope.update();
			$rootScope.$on('$routeChangeSuccess', function () {
					expect(flash.getMessage()).toBe('An error occured while applying the changes');
					return done();
				});

			//$routeChangeSuccess is normaly triggered when view and controller are loaded
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});
	});
});


