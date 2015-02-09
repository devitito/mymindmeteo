/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


var NewReportCtrl = adminControllers.controller('NewReportCtrl', ['$scope', '$location', '$q', 'flash', 'identity', 'reportsFactory', 'reportCategories', 'reportRanges', 'sensorStatus',
    function ($scope, $location, $q, flash, identity, reportsFactory, reportCategories, reportRanges, sensorStatus) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.categories = reportCategories;
		$scope.ranges = reportRanges;
		$scope.statusList = sensorStatus;

		$scope.create = function() {
			reportsFactory.save($scope.report).$promise
			.then (function(success) {
					flash.setMessage('Report template created successfully!');
					$location.path('/administrator/result/reports/'+success.id+'/1');
			})
			.catch(function(errors) {
				try {
					var list = angular.fromJson(errors).data;
					angular.forEach(list, function (value) {
						flash.setMessage(value);
					}) ;
				} catch (e) {
					flash.setMessage('An error occured while creating the report template.');
				}
				$location.path('/administrator/result/reports/0/1');
			});
		};
}]);
