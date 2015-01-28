/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var guestRegistrationCtrl = guestControllers.controller('guestRegistrationCtrl', ['$scope', '$location', 'mindFactory',
    function ($scope, $location, mindFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.error = [];
		$scope.new = function () {
			mindFactory.save({}, $scope.mind).$promise
			.then(function(success) {
				if (success.role == 'admin')
						$scope.go('/administrator/');
				else
						$scope.go('/mind/dashboard/' + success.name);
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
