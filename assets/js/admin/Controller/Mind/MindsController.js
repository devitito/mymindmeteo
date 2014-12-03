/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

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
