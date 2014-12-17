/**
 *
 *
 */
describe("admin routes", function() {
	beforeEach(module('mindmeteo'));

	var $location, $route, $rootScope, $q, $httpBackend, $injector;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$q_, _$httpBackend_, _$injector_){
		$location = _$location_;
		$route = _$route_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$injector = _$injector_;
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/csrfToken').respond(200);
	}));

	describe("/minds/edit", function() {
		var mindFactory, identityService;

		beforeEach(inject(
			function(_mindFactory_, _identityService_) {
				$httpBackend.expectGET('/js/admin/partials/mind/edit.html').respond(200);

				var mind = $q.defer();
				mind.resolve('a mind');
				mindFactory = _mindFactory_;
				spyOn(mindFactory, 'get').and.callFake(function (id, success, error) {
					return success(mind.promise);
				});

				var identity = $q.defer();
				identity.resolve('an identity');
				identityService = _identityService_;
				spyOn(identityService, 'get').and.returnValue(identity.promise);
			}
		));

		it('should resolve mind and identity', function() {
			var resolvedMind;
			var resolvedIdentity;
			expect($location.path()).toBe( '' );
			$location.path('/minds/edit/2');

			$rootScope.$digest();

			expect($location.path()).toBe( '/minds/edit/2' );
			expect($route.current.controller).toBe('EditMindCtrl');
			expect($route.current.templateUrl).toEqual('/js/admin/partials/mind/edit.html');

			// We need to do $injector.invoke to resolve dependencies
			var mindPromise = $injector.invoke($route.current.resolve.mind);
			mindPromise.then(function(value) {
				resolvedMind = value;
			});

			var identityPromise = $injector.invoke($route.current.resolve.identity);
			identityPromise.then(function(value) {
				resolvedIdentity = value;
			});

			// Propagate promise resolution to 'then' functions using $apply().
			$rootScope.$apply();
			expect(resolvedMind).toBe('a mind');
			expect(resolvedIdentity).toBe('an identity');

    });
	});
});
