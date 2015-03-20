/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindControllers.controller('mindProfileEditCtrl', [
	'$scope',
	'$location',
	'$timeout',
	'$sce',
	'identity',
  function ($scope, $location, $timeout, $sce, identity) {

		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.identity = identity;
}]);
