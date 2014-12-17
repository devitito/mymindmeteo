/**
 *
 *
 */
describe("admin routes", function() {
	beforeEach(module('mindmeteo'));

	var $location, $route, $rootScope, $q, $httpBackend;;

	beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$q_, _$httpBackend_){
		$location = _$location_;
		$route = _$route_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/csrfToken').respond(200);
	}));

	describe("/minds/edit", function() {
		var mindFactory, identityService;

		beforeEach(inject(
			function(_mindFactory_, _identityService_) {
				$httpBackend.expectGET('/js/admin/partials/mind/edit.html').respond(200);

				mindFactory = _mindFactory_;
				spyOn(mindFactory, 'get').and.returnValue('a mind');

				var identity = $q.defer();
				identity.resolve('an identity');
				identityService = _identityService_;
				spyOn(identityService, 'get').and.returnValue(identity.promise);
			}
		));

		it('should resolve mind and identity', inject(function($injector) {
			expect($location.path()).toBe( '' );
			$location.path('/minds/edit/2');

			$rootScope.$digest();

			expect($location.path()).toBe( '/minds/edit/2' );
			expect($route.current.controller).toBe('EditMindCtrl');
			expect($route.current.templateUrl).toEqual('/js/admin/partials/mind/edit.html');

			// We need to do $injector.invoke to resolve dependencies
			var mindPromise = $injector.invoke($route.current.resolve.mind);
			mindPromise.then(function() {
				expect($route.current.resolve.mind).toBe('a mind');
			});

			var identityPromise = $injector.invoke($route.current.resolve.identity);
			identityPromise.then(function() {
				expect($route.current.resolve.identity).toBe('an identity');
			});
    }));
	});
});
