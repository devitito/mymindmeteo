/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', 'identity', 'flash',
    function ($scope, $location, identity, flash) {
			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.identity = identity;
}]);
