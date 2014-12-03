var adminControllers = angular.module('adminControllers', []);

var mindsCtrl = adminControllers.controller('mindsCtrl', ['$scope', '$location', 'minds', 'lang', 'identity',
    function ($scope, $location, minds, lang, identity) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };

	    $scope.langtools = lang;
	    $scope.locale = identity.locale;
			console.log($scope.locale);

	    if (angular.isArray(minds))
				$scope.minds = minds;
			else
				$scope.error = minds;
}]);

var ResultCtrl = adminControllers.controller('ResultCtrl', ['$scope', '$location', 'flash', '$routeParams',
    function ($scope, $location, flash, $routeParams) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.result = $routeParams.result;
		$scope.returnRoute = '/' + $routeParams.object +'/edit/' + $routeParams.id;
		$scope.finishRoute = '/' + $routeParams.object;
		$scope.flash = flash;
}]);

adminControllers.controller('dashboardCtrl', ['$scope', 'recovery',
    function ($scope, recovery) {
		$scope.recover = function () {
			$scope.recovery_date = '  In progress. Wait...';
			recovery.query(
				function(data){
					console.log(data[0]);
					$scope.recovery_date = '  Indexes re-created on : ' + data[0].toString();
	            },
	            function(error) {
	            	$scope.error = 'An error occured while recovering the undindexed records';
	  	    		//todo display error
	           });
		}
}]);

var NewMindCtrl = adminControllers.controller('NewMindCtrl', ['$scope', '$location', '$q', 'flash', 'roles', 'identity', 'lang', 'timezones', 'mindFactory',
    function ($scope, $location, $q, flash, roles, identity, lang, timezones, mindFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.langs = lang.list(identity.locale);
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.flash = flash;

		$scope.create = function() {
			mindFactory.save($scope.mind,
				function(success) {
					flash.setMessage('Mind created successfully!');
					$location.path('/result/minds/'+success.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (value) {
							flash.setMessage(value);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while creating the mind.');
					}
					$location.path('/result/minds/0/1');
			});
		};
}]);

var statsCtrl = adminControllers.controller('statsCtrl', ['$scope', 'stats', 'statsFactory',
    function ($scope, stats, statsFactory) {
		try {
			var stats = angular.fromJson(stats);
			angular.forEach(stats, function(key, value) {
				$scope[value] = {};
				$scope[value].data = statsFactory.populate(value, key);
				$scope[value].type = statsFactory.getType(value);
				$scope[value].options = statsFactory.getOptions(value);
			});
		} catch (e) {
			$scope.errors = 'error';
		};
}]);
