var adminControllers = angular.module('adminControllers', []);

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

adminControllers.controller('dashboardCtrl', ['$scope', 'recovery', 'identity',
    function ($scope, recovery, identity) {
		$scope.recover = function () {
			$scope.recovery_date = '  In progress. Wait...';
			recovery.query(
				function(data){
					$scope.recovery_date = '  Indexes re-created on : ' + moment().locale(identity.locale).format('lll');
	            },
	            function(error) {
	            	$scope.error = 'An error occured while recovering the undindexed records';
	  	    		//todo display error
	           });
		}
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
