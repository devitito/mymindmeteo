/**
 *
 *
 */
describe("routes", function() {
	beforeEach(function () {
		module('mindmeteo');
	});

	var $location, $route, $rootScope, $q, $httpBackend, $injector, $scope, flash;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$q_, _$httpBackend_, _$injector_, _flash_) {
		$location = _$location_;
		$route = _$route_;
		$rootScope = _$rootScope_;
		$scope = {};
		$q = _$q_;
		$injector = _$injector_;
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/csrfToken').respond(200);
		flash = _flash_;
	}));

	describe("/minds/edit", function() {
		var mindFactory, identityService;

		beforeEach(inject(
			function(_mindFactory_, _identityService_) {
				$httpBackend.expectGET('/js/admin/partials/mind/edit.html').respond(200);

				mindFactory = _mindFactory_;
				spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
					//Handle both callbacks and promise
					if (angular.isDefined(success))
						//mindFactory.get called with callback
						return success('a mind');
					else {
						//mindFactory.get called with promise
						getDeferred = $q.defer();
						getDeferred.resolve('a mind');
						return {$promise: getDeferred.promise};
					};
				});

				var identity = $q.defer();
				identity.resolve('an identity');
				identityService = _identityService_;
				spyOn(identityService, 'get').and.returnValue(identity.promise);
			}
		));

		beforeEach(function() {
			expect($location.path()).toBe( '' );
			$location.path('/administrator/minds/edit/2');
			$rootScope.$digest();
		});

		it('should be defined', function() {
			expect($location.path()).toBe( '/administrator/minds/edit/2' );
			expect($route.current.controller).toBe('EditMindCtrl');
			expect($route.current.templateUrl).toEqual('/js/admin/partials/mind/edit.html');
		});

		it('should resolve mind', function() {
			var resolvedMind;
			// We need to do $injector.invoke to resolve dependencies
			var mindPromise = $injector.invoke($route.current.resolve.mind);
			mindPromise.then(function(value) {
				resolvedMind = value;
			});

			// Propagate promise resolution to 'then' functions using $apply().
			$rootScope.$apply();
			expect(resolvedMind).toBe('a mind');
    });

		it('should resolve identity', function() {
			var resolvedIdentity;
			// We need to do $injector.invoke to resolve dependencies
			var identityPromise = $injector.invoke($route.current.resolve.identity);
			identityPromise.then(function(value) {
				resolvedIdentity = value;
			});

			// Propagate promise resolution to 'then' functions using $apply().
			$rootScope.$apply();
			expect(resolvedIdentity).toBe('an identity');
    });
	});

	describe("/minds/edit if cannot resolve", function() {
		var mindFactory, identityService;

		var getMindWithError = function (id, success, error) {
			//Handle both callbacks and promise
			if (angular.isDefined(error))
				//mindFactory.get called with callback
				return error({data: 'an error message'});
			else {
				//mindFactory.get called with promise
				getDeferred = $q.defer();
				getDeferred.reject({data: 'an error message'});
				return {$promise: getDeferred.promise};
			};
		};

		var getMindWithSuccess = function (id, success, error) {
			//Handle both callbacks and promise
			if (angular.isDefined(success))
				//mindFactory.get called with callback
				return success('a mind');
			else {
				//mindFactory.get called with promise
				getDeferred = $q.defer();
				getDeferred.resolve('a mind');
				return {$promise: getDeferred.promise};
			}
		};

		var getIdentityWithSuccess = function() {
			var deferred = $q.defer();
			deferred.resolve('an identity');
			return deferred.promise;
		};

		var getIdentityWithError = function() {
			var deferred = $q.defer();
			deferred.reject('a reason');
			return deferred.promise;
		};

		beforeEach(inject(
			function(_mindFactory_, _identityService_) {
				$httpBackend.expectGET('/js/admin/partials/mind/edit.html').respond(200);

				mindFactory = _mindFactory_;
				identityService = _identityService_;
			}
		));

		it("mind Should redirect toward result page with error message", function(done) {
			$httpBackend.expectGET('/js/admin/partials/admin/edited.html').respond(200);
			spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
				return getMindWithError(id, success, error);
			});

			spyOn(identityService, 'get').and.callFake(function () {
				return getIdentityWithSuccess();
			});

			expect($location.path()).toBe( '' );
			$location.path('/administrator/minds/edit/2');
			$rootScope.$digest();

			expect($location.path()).toBe( '/administrator/result/minds/0/1' );

			$rootScope.$on('$routeChangeSuccess', function () {
				expect(flash.getMessage()).toBe('an error message');
				return done();
			});

			//The message will be available when $routeChangeSuccess event is triggered
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});

		it("identity Should logout", function() {
			$httpBackend.expectGET('/js/guest/partials/homepage.html').respond(200);
			spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
				return getMindWithSuccess(id, success, error);
			});

			spyOn(identityService, 'get').and.callFake(function () {
				return getIdentityWithError();
			});

			expect($location.path()).toBe( '' );
			$location.path('/administrator/minds/edit/2');
			$rootScope.$digest();
			expect($location.path()).toBe( '/' );
		});
	});

	describe("/mind/dashboard", function() {

		/*var getClimateWithSuccess = function (id, success, error) {
			//Handle both callbacks and promise
			if (angular.isDefined(success))
				//statsFactory.climate called with callback
				return success([{data: 'some data'}, {data: 'some other data'}]);
			else {
				//statsFactory.climate called with promise
				climateDeferred = $q.defer();
				climateDeferred.resolve([{data: 'some data'}, {data: 'some other data'}]);
				return climateDeferred.promise;
			};
		};

		var getClimateWithError = function (id, success, error) {
			//Handle both callbacks and promise
			if (angular.isDefined(error))
				//statsFactory.climate called with callback
				return error({data: 'an error'});
			else {
				//statsFactory.climate called with promise
				climateDeferred = $q.defer();
				climateDeferred.reject({data: 'an error'});
				return climateDeferred.promise;
			};
		};*/

		beforeEach(inject(
			function(_statsFactory_, _identityService_) {
				$httpBackend.expectGET('/mind/climate/demo').respond(200);
				$httpBackend.expectGET('/js/mind/partials/dashboard.html').respond(200);

				statsFactory = _statsFactory_;
				var identity = $q.defer();
				identity.resolve('an identity');
				identityService = _identityService_;
				spyOn(identityService, 'get').and.returnValue(identity.promise);
			}
		));

		beforeEach(function() {
			expect($location.path()).toBe( '' );
			$httpBackend.expectGET('/js/guest/partials/homepage.html').respond(200);

			$location.path('/mind/dashboard/demo');
			$rootScope.$digest();
		});

		/*it("should resolve climate", function () {
			var resolvedClimate;

			spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
				return getClimateWithSuccess(id, success, error);
			});

			// We need to do $injector.invoke to resolve dependencies
			var climatePromise = $injector.invoke($route.current.resolve.climat);
			climatePromise.then(function(value) {
				resolvedClimate = value;
			});

			// Propagate promise resolution to 'then' functions using $apply().
			$rootScope.$apply();
			expect(resolvedClimate).toEqual([{data: 'some data'}, {data: 'some other data'}]);
		});

		it("should return a formated error if climate couldn't be resolved", function () {
			var rejectedClimate;

			spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
				return getClimateWithError(id, success, error);
			});

			// We need to do $injector.invoke to resolve dependencies
			var climatePromise = $injector.invoke($route.current.resolve.climat);
			climatePromise.catch(function(error) {
				rejectedClimate = error;
			});

			// Propagate promise resolution to 'then' functions using $apply().
			$rootScope.$apply();
			expect(rejectedClimate).toEqual({data: 'an error'});
		});*/
	});

});
