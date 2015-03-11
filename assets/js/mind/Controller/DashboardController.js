/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', '$timeout', 'identity', 'sessionFactory', 'statsFactory', 'recordsFactory', 'climateChartHelper', 'tableHelper', 'usSpinnerService', 'reportCategories', 'emociconeService', 'reportRanges',
    function ($scope, $location, $timeout, identity, sessionFactory, statsFactory, recordsFactory, climateChartHelper, tableHelper, usSpinnerService, reportCategories, emociconeService, reportRanges) {
			$scope.go = function (url) {
				$location.path(url);
			};

			statsFactory.climate(identity.name)
			.then(function (climate) {
				climateChartHelper.load($scope, climate);
				//wait a bit for the graph to display on slow device
				$timeout(function() {
					usSpinnerService.stop('spinner');
					$scope.spinneroff = true;
				}, 1000);
			})
			.catch(function (error) {
				$scope.showError(error);
			});

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
			$scope.spinneroff = false;

			$scope.getImgByCategory = function (category) {
				var img = reportCategories.img(category);
				console.log(img);
				return img;
				//return reportCategories.img(category);
			};

			$scope.getCategoryLabel = function(category) {
				var label = reportCategories.label(category);
				console.log(label);
				return 'Category: ' + label;
			};

			$scope.getEmocicone = function (range) {
				var img = emociconeService.range2img(range);
				console.log(img);
				return img;
			};

			$scope.getMoodRangeLabel = function(range) {
				var label = reportRanges.label(range);
				console.log(label);
				return 'Mood: ' + label;
			}
}]);
