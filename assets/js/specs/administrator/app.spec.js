/**
 *
 *
 */
describe("administrator routes", function() {
	beforeEach(function () {
		module('administrator');
	});

	var $location, $route, $rootScope, $q, $httpBackend, $injector, $scope, $window, flash;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$q_, _$httpBackend_, _$injector_, _$window_, _flash_) {
		$location = _$location_;
        $window = {
          location : {
            href: '',
          }
        };
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
				$httpBackend.expectGET('/templates/administrator/mind/edit.html').respond(200);

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
			$location.path('/minds/edit/2');
			$rootScope.$digest();
		});

		it('should be defined', function() {
			expect($location.path()).toBe( '/minds/edit/2' );
			expect($route.current.controller).toBe('EditMindCtrl');
			expect($route.current.templateUrl).toEqual('/templates/administrator/mind/edit.html');
		});

		it('should resolve user', function() {
			var resolvedMind;
			// We need to do $injector.invoke to resolve dependencies
			var mindPromise = $injector.invoke($route.current.resolve.user);
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
				$httpBackend.expectGET('/templates/administrator/mind/edit.html').respond(200);

				mindFactory = _mindFactory_;
				identityService = _identityService_;
			}
		));

		it("mind Should redirect toward result page with error message", function(done) {
			$httpBackend.expectGET('/templates/administrator/edited.html').respond(200);
			spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
				return getMindWithError(id, success, error);
			});

			spyOn(identityService, 'get').and.callFake(function () {
				return getIdentityWithSuccess();
			});

			expect($location.path()).toBe( '' );
			$location.path('/minds/edit/2');
			$rootScope.$digest();

			expect($location.path()).toBe( '/result/minds/0/1' );

			$rootScope.$on('$routeChangeSuccess', function () {
				expect(flash.getMessage()).toBe('an error message');
				return done();
			});

			//The message will be available when $routeChangeSuccess event is triggered
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});

		xit("identity Should logout", function() {
			$httpBackend.expectGET('/templates/welcome/partials/homepage.html').respond(200);
			spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
				return getMindWithSuccess(id, success, error);
			});

			spyOn(identityService, 'get').and.callFake(function () {
				return getIdentityWithError();
			});

			expect($location.path()).toBe( '' );
			$location.path('/minds/edit/2');
			$rootScope.$digest();
			expect($window.location.href).toBe( '/' );
		});
	});


});
