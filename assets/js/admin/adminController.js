

var ResultCtrl = adminControllers.controller('ResultCtrl', ['$scope', '$location', 'flash', '$routeParams',
    function ($scope, $location, flash, $routeParams) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.result = $routeParams.result;
		$scope.returnRoute = '/administrator/' + $routeParams.object +'/edit/' + $routeParams.id;
		$scope.finishRoute = '/administrator/' + $routeParams.object;
		$scope.flash = flash;
}]);

/*adminControllers.controller('dashboardCtrl', ['$scope', 'recovery', 'identity',
    function ($scope, recovery, identity) {
		$scope.recover = function () {
			$scope.result = '  In progress. Wait...';
			recovery.query(
				function(data){
					$scope.result = '  Indexes re-created on : ' + moment().locale(identity.locale).format('lll');
				},
				function(error) {
					try {
					$scope.result = '  ' + error.data.message;
					} catch (e) {
						$scope.result = '  An error occured while re indexing the records';
					}
				});
		}
}]);*/

/*
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
*/
