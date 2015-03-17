describe("Mind Dashboard Controller", function() {
	var DashboardController, lang, identityService, statsFactory;
	var $controller;
	var $scope;
	var $rootScope;
	var $q;

	beforeEach(function () {
		module('mindControllers');
		module('adminServices');
		module('guestServices');
		module('mindServices');
		module('angularMoment');
		module('LocalStorageModule');
		module('ui.bootstrap');
		module('ngTable');
		module('angularSpinner');
		module('snap');
	});

	beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _lang_, _identityService_, _statsFactory_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		lang = _lang_;
		identityService = _identityService_;
		statsFactory = _statsFactory_;
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
			statsFactory: statsFactory
		});

		// Propagate promise resolution to 'then' functions using $apply().
		$rootScope.$apply();

		expect($scope.message).toBe("We couldn't retrieve your climate data. Please try again");
		expect($scope.climate).toBe(undefined);
	});

	xit("should display an error message if the climate promise is rejected", function () {
	});
});
