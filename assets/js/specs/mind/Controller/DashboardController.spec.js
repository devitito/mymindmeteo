describe("Mind Dashboard Controller", function() {
	var DashboardController, flash, lang, identityService, moment;
	var $controller;
	var $scope;
	var $rootScope;
	var $q;
	var $location;

	beforeEach(function () {
		module('mindControllers');
		module('adminServices');
		module('guestServices');
		module('angularMoment');
		module('LocalStorageModule');
	});

	beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$location_, _flash_, _lang_, _identityService_, _sessionFactory_, _moment_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$location = _$location_;
		flash = _flash_;
		lang = _lang_;
		identityService = _identityService_;
		sessionFactory = _sessionFactory_;
		moment = _moment_;
	}));

	it("should forward a linechart object if the climate data is fetched without error", function () {
		$scope = {};
		DashboardController = $controller('mindDashboardCtrl', {
			$scope: $scope,
			$location: $location,
			identity: {id: 'anid'},
			flash: flash,
			sessionFactory: sessionFactory,
			climat: [
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
			],
			moment: moment
		});
		expect($scope.message).toBe(undefined);
		expect($scope.climate.options).not.toBeUndefined();
		expect($scope.climate.type).toBe('LineChart');
		expect(angular.isObject($scope.climate.data)).toBe(true);
	});

	it("should replace the climate graph with a message if there is no climate data for the currently logged in mind", function () {
		$scope = {};
		DashboardController = $controller('mindDashboardCtrl', {
			$scope: $scope,
			$location: $location,
			identity: {id: 'anid'},
			flash: flash,
			sessionFactory: sessionFactory,
			climat: [],
			moment: moment
		});
		expect($scope.message).toBe('No meteo data captured.');
		expect($scope.climate).toBe(undefined);
	});

	it("should forward the error if it couldn't fetch mind's climate and the server replied with a well formated error message", function () {
		$scope = {};
		DashboardController = $controller('mindDashboardCtrl', {
			$scope: $scope,
			$location: $location,
			identity: {id: 'anid'},
			flash: flash,
			sessionFactory: sessionFactory,
			climat: {error: 'an error'},
			moment: moment
		});
		expect($scope.message).toBe('an error');
		expect($scope.climate).toBe(undefined);
	});

	it("should forward a default message if it couldn't fetch mind's climate and the server didn't reply with a well formated error message", function () {
		$scope = {};
		DashboardController = $controller('mindDashboardCtrl', {
			$scope: $scope,
			$location: $location,
			identity: {id: 'anid'},
			flash: flash,
			sessionFactory: sessionFactory,
			climat: 'not well formated error message',
			moment: moment
		});
		expect($scope.message).toBe("We couldn't retrieve your climate data. Please try again");
		expect($scope.climate).toBe(undefined);
	});
});
