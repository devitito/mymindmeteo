/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


angular.module('statement', ['ngResource', 'session', 'stats', 'report', 'emocicones', 'snap'])
.controller('mindNewStatementCtrl', [
	'$scope',
	'$location',
	'$timeout',
	'$sce',
	'identity',
	'sessionFactory',
	'statsFactory',
	'reportCategories',
	'emociconeService',
	'reportRanges',
	'snapRemote',
	'statementsFactory',
  function ($scope, $location, $timeout, $sce, identity, sessionFactory, statsFactory, reportCategories, emociconeService, reportRanges, snapRemote, statementsFactory) {
		$scope.processing = false;
		$scope.redirect = false;

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
			try {
				$scope.error = $sce.trustAsHtml(error.message);
				if (error.name == 'NoRecentRecords')
					$scope.redirect = true;
			} catch (e) {
				$scope.showError("Our meteologist are too busy currently. There is an hurrican somewhere.<br>You are not the center of the world.<br>Try again later.");
			}
			//$scope.error = $sce.trustAsHtml(error);
			$timeout(function() {
				$scope.error = undefined;
				if ($scope.redirect)
					$location.path('/dashboard/'+$scope.identity.name);
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

		$scope.getRangeLabel = function(range) {
			return reportRanges.label(range);
		}

		$scope.getEmocicone = function (range) {
			return emociconeService.range2img(range);
		};

		$scope.getCategoryLabel = function(category) {
			return reportCategories.label(category);
		};

		$scope.options = {};
		$scope.generate = function() {
			$scope.processing = true;
			var statement = new statementsFactory();
			statement.recipient = $scope.options.recipient;
			statement.category = $scope.options.category;
			statement.$generate({id: $scope.identity.id})
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
}])
  .factory('statementsFactory', ['$resource', '$q', function($resource, $q){
	var factory = $resource('/statement/:id', {id:'@id'}, {
		bymind: {method: 'GET', url: '/statement/bymind'},
		generate: {method: 'POST', url: '/statement/generate'}
	});

	return factory;
}]);
