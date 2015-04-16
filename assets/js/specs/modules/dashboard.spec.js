

describe('The dashboard Angular module', function() {
  beforeEach(function () {
    angular.mock.module('dashboard');
  });

  describe("dashboardCtrl Controller", function() {

    beforeEach(inject(function($controller, $rootScope, recovery) {
		this.controller = $controller;
		this.rootScope = $rootScope;
        this.scope = $rootScope.$new();
		this.recovery = {};
        this.identity = {};
	}));

    describe("recover() method", function() {
      it("should call recovery.query() service", function (done) {
        this.recovery.query = function () {
          done();
        };

        this.controller('dashboardCtrl', {
          $scope: this.scope,
          recovery: this.recovery,
          identity: this.identity
        });

        this.scope.recover();
      });

      it("should feed result with a waiting message when starting recovery process", function (done) {
        this.recovery.query = function () {
          done();
        };

        this.controller('dashboardCtrl', {
          $scope: this.scope,
          recovery: this.recovery,
          identity: this.identity
        });

        expect(this.scope.result).toBeUndefined();
        this.scope.recover();
        expect(this.scope.result).toBe('  In progress. Wait...');
      });

      it("should forward well formated recovery error message to result", function (done) {
        this.recovery.query = function (success, error) {
          error({
            data: {
              message: "a well formated error message"
            }
          });
          done();
        };

        this.controller('dashboardCtrl', {
          $scope: this.scope,
          recovery: this.recovery,
          identity: this.identity
        });

        this.scope.recover();
        expect(this.scope.result).toBe('  a well formated error message');
      });

      it("should replace a misformated recovery error message to result", function (done) {
        this.recovery.query = function (success, error) {
          error("a misformated error message");
          done();
        };

        this.controller('dashboardCtrl', {
          $scope: this.scope,
          recovery: this.recovery,
          identity: this.identity
        });

        this.scope.recover();
        expect(this.scope.result).toBe('  An error occured while re indexing the records');
      });
    });
  });

  describe("mindDashboardCtrl Controller", function() {
    var DashboardController, identityService, statsFactory;
	var $controller;
	var $scope;
	var $rootScope;
	var $q;

	beforeEach(function () {
      module('session');
      module('flashMsg');
      module('stats');
      module('angularMoment');
      module('LocalStorageModule');
      module('ui.bootstrap');
      module('ngTable');
      module('angularSpinner');
      module('statement');
      //	module('snap');
	});

	beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _identityService_, _statsFactory_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      identityService = _identityService_;
      statsFactory = _statsFactory_;
      this.statementsFactory = {
        bymind: function() {
          return {$promise: $q.defer().promise};
        }
      };
	}));

	var getClimateWithSuccess = function (id, success, climate) {
		//Handle both callbacks and promise
		if (angular.isDefined(success))
			//statsFactory.climate called with callback
			return success(climate);
		else {
			//statsFactory.climate called with promise
			climateDeferred = $q.defer();
			climateDeferred.resolve(climate);
			return climateDeferred.promise;
		};
	};

	var getClimateWithError = function (id, error, climate) {
		//Handle both callbacks and promise
		if (angular.isDefined(error))
			//statsFactory.climate called with callback
			return error(climate);
		else {
			//statsFactory.climate called with promise
			climateDeferred = $q.defer();
			climateDeferred.reject(climate);
			return climateDeferred.promise;
		};
	};

	/*var mockTimeout = function(cb, delay) {
		cb();
	};*/

    it("should forward a linechart object if the climate data is fetched without error", function () {
      $scope = {};

      var climate = {
        info: {total:2, sunny:2, rainy:0},
        data: [
          {
            "date": "2014-06-04T00:00:00Z",
            "love" : 5,
            "money" : -2,
            "health": 6,
            "mood": 3
          },
          {
            "date": "2014-06-11T00:00:00Z",
            "love" : 5,
            "money" : -2,
            "health": 6,
            "mood": 3
          }
        ]
      };

      spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
        return getClimateWithSuccess(id, success, climate);
      });

      DashboardController = $controller('mindDashboardCtrl', {
        $scope: $scope,
        identity: {id: 'anid'},
        statsFactory: statsFactory,
        statementsFactory: this.statementsFactory
      });

      // Propagate promise resolution to 'then' functions using $apply().
      $rootScope.$apply();

      expect($scope.message).toBe(undefined);
      expect($scope.climate.options).not.toBeUndefined();
      expect($scope.climate.type).toBe('LineChart');
      expect(angular.isObject($scope.climate.data)).toBe(true);
      expect($scope.total).toBe(2);
      expect($scope.sunny).toBe(2);
      expect($scope.rainy).toBe(0);
    });

    it("should replace the climate graph with a message if there is no climate data for the currently logged in mind", function () {
      $scope = {};

      var climate = {
        info: {total:'tot', sunny:'sun', rainy:'rain'},
        data: []
      };

      spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
        return getClimateWithSuccess(id, success, climate);
      });

      DashboardController = $controller('mindDashboardCtrl', {
        $scope: $scope,
        identity: {id: 'anid'},
        statsFactory: statsFactory,
        statementsFactory: this.statementsFactory
      });

      // Propagate promise resolution to 'then' functions using $apply().
      $rootScope.$apply();

      expect($scope.message).toBe('No meteo data captured.');
      expect($scope.total).toBe('tot');
      expect($scope.sunny).toBe('sun');
      expect($scope.rainy).toBe('rain');
      expect($scope.climate).toBe(undefined);
    });

	it("should forward the error if it couldn't fetch mind's climate and the server replied with a well formated error message", function () {
      $scope = {};
      var climate = {error: 'an error'};

      spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
        return getClimateWithSuccess(id, error, climate);
      });

      DashboardController = $controller('mindDashboardCtrl', {
        $scope: $scope,
        identity: {id: 'anid'},
        statsFactory: statsFactory,
        statementsFactory: this.statementsFactory
      });

      // Propagate promise resolution to 'then' functions using $apply().
      $rootScope.$apply();

      expect($scope.message).toBe('an error');
      expect($scope.climate).toBe(undefined);
      expect($scope.total).toBe('-');
      expect($scope.sunny).toBe('-');
      expect($scope.rainy).toBe('-');
    });

    it("should forward a default message if it couldn't fetch mind's climate and the server didn't reply with a well formated error message", function () {
      $scope = {};
      var climate = 'not well formated error message';

      spyOn(statsFactory, 'climate').and.callFake(function (id, success, error) {
        return getClimateWithSuccess(id, error, climate);
      });

      DashboardController = $controller('mindDashboardCtrl', {
        $scope: $scope,
        identity: {id: 'anid'},
        statsFactory: statsFactory,
        statementsFactory: this.statementsFactory
      });

      // Propagate promise resolution to 'then' functions using $apply().
      $rootScope.$apply();

      expect($scope.message).toBe("We couldn't retrieve your climate data. Please try again");
      expect($scope.climate).toBe(undefined);
    });

	xit("should display an error message if the climate promise is rejected", function () {
	});
  });

  describe("adminNavBarCtrl controller", function () {
    beforeEach(inject(function($controller, $rootScope, $window) {
      this.rootScope = $rootScope;
      this.scope = $rootScope.$new();
      this.sessionFactory = {};
      this.identityService = {};
      this.controller = $controller('adminNavBarCtrl', {
        $scope: this.scope,
        $window: $window,
        identityService: this.identityService,
        sessionFactory: this.sessionFactory
      });
	}));
  });
});
