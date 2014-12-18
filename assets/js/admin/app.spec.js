/**
 *
 *
 */
describe("admin routes", function() {
	beforeEach(module('mindmeteo'));

	var $location, $route, $rootScope, $q, $httpBackend, $injector, $scope, flash;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$q_, _$httpBackend_, _$injector_, _flash_){
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
			$location.path('/minds/edit/2');
			$rootScope.$digest();
		});

		it('should be defined', function() {
			expect($location.path()).toBe( '/minds/edit/2' );
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

		beforeEach(inject(
			function(_mindFactory_, _identityService_) {
				$httpBackend.expectGET('/js/admin/partials/mind/edit.html').respond(200);
				$httpBackend.expectGET('/js/admin/partials/admin/edited.html').respond(200);

				mindFactory = _mindFactory_;
				spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
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

		it("mind Should redirect toward result page with error message", function(done) {
			expect($location.path()).toBe( '/result/minds/0/1' );

			$rootScope.$on('$routeChangeSuccess', function () {
				expect(flash.getMessage()).toBe('an error message');
				return done();
			});

			//The message will be available when $routeChangeSuccess event is triggered
			$rootScope.$broadcast('$routeChangeSuccess', {});
		});
	});

});
