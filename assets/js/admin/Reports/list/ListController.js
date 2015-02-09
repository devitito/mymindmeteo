/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var ReportListCtrl = adminControllers.controller('ReportListCtrl', ['$scope', '$location', 'reports', 'lang', 'identity',
    function ($scope, $location, reports, lang, identity) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };

	    if (angular.isArray(reports))
				$scope.reports = reports;
			else
				$scope.error = reports;
}]);
