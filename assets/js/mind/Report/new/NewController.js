/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindControllers.controller('mindNewReportCtrl', [
	'$scope',
	'$location',
	'$timeout',
	'identity',
	'sessionFactory',
	'statsFactory',
	'reportCategories',
	'emociconeService',
	'reportRanges',
	'snapRemote',
	'statementsFactory',
  function ($scope, $location, $timeout, identity, sessionFactory, statsFactory, reportCategories, emociconeService, reportRanges, snapRemote, statementsFactory) {
		$scope.processing = false;

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

		$scope.showError = function (error) {
			$scope.processing = false;
			$scope.error = error;
			$timeout(function() {
				$scope.error = undefined;
			}, 5000);
		};

		$scope.categories = reportCategories.categories;

		$scope.getCategoryLabel = function(category) {
			var label = reportCategories.label(category);
			console.log(label);
			return label;
		};

		$scope.ViewStatement = function(statement) {
			$scope.editedStatement = statement;
		};

		$scope.generate = function(report) {
			$scope.processing = true;
			statementsFactory.generate({id: $scope.identity.id}).$promise
			.then(function (statement) {
				$scope.processing = false;
				$scope.ViewStatement(statement);
			})
			.catch(function (error) {
				try {
					$scope.showError(error.data.error);
				} catch (e) {
					$scope.showError("Our meteologist are too busy currently. There is an hurrican somewhere.<br>You are not the center of the world.<br>Try again later.");
				}
			});
		};
}]);
