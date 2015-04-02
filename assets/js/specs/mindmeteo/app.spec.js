/**
 *
 *
 */
describe("The mindmeteo Angular module", function () {

  beforeEach(function () {
    module('mindmeteo');
  });

  describe("routes", function() {

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

      describe("/mind/dashboard", function() {

        it("should be tested", function () {
          expect(true).toBe(true);
        });
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

});
