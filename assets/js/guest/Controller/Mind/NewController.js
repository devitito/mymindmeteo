/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var guestRegistrationCtrl = guestControllers.controller('guestRegCtrl', ['$scope', '$location', 'mindFactory', 'sessionFactory',
    function ($scope, $location, mindFactory, sessionFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.error = [];
		$scope.new = function () {
			mindFactory.save({}, $scope.mind).$promise
			.then(function(success) {
				sessionFactory.create({nameoremail: $scope.mind.name, password: $scope.mind.password})
				.then(function(success) {
					$scope.go('/mind/dashboard/' + success.name);
				})
				.catch(function(error) {
					flash.setMessage(error.data);
					$location.path('/session/new');
				});
			})
			.catch(function(error) {
				try {
						$scope.error.push(error.data.summary);
				} catch (e) {
					$scope.error.push('An error occured while creating the mind.');
				}
				$location.path('/mind/new');
			});
		};
}]);