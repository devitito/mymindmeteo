/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', '$timeout', 'identity', 'sessionFactory', 'climat', 'recordsFactory', 'climateChartHelper', 'tableHelper',
    function ($scope, $location, $timeout, identity, sessionFactory, climat, recordsFactory, climateChartHelper, tableHelper) {
			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.identity = identity;

			$scope.logout = function () {
				sessionFactory.destroy()
				.then(function(success) {
					$location.path('/');
				})
				.catch(function(error) {
					//todo display error
				});
			};

			$scope.ViewStatement = function(statement) {
				statement.notread = false;
				$scope.editedStatement = statement;
			};

			$scope.sendStatement = function() {
				$scope.editedStatement = undefined;
				$scope.sentConfirm = 'Message sent successfully!';
				$timeout(function () {
					$scope.sentConfirm = undefined;
				}, 3000);
			};

			$scope.close = function() {
				$scope.editedStatement = undefined;
			};

			$scope.showError = function (error) {
				$scope.processing = false;
				$scope.error = error;
				$timeout(function() {
					$scope.error = undefined;
				}, 5000);
			};

			$scope.record = function () {
				recordsFactory.launch($scope);
			};

			$scope.openReportList = function () {
				$scope.show = 'reports';
				$scope.newReports = false;
			};

			$scope.openClimate = function () {
				$scope.show = 'climate';
			};

			$scope.tableParams = tableHelper.new('statements-list', {id:$scope.identity.id});

			$scope.show = 'climate';
			$scope.processing = false;
			climateChartHelper.load($scope, climat);
}]);
