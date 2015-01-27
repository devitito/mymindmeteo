/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var newSessionCtrl = guestControllers.controller('newSessionCtrl', ['$scope', '$location', 'sessionFactory',
    function ($scope, $location, sessionFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.new = function () {
			sessionFactory.create({}, {nameoremail: $scope.nameoremail, password: $scope.password}).$promise
			.then(function(success) {
				if (success.role == 'admin')
						$scope.go('/administrator/');
				else
						$scope.go('/mind/dashboard/' + success.name);
			})
			.catch(function(error) {
				$scope.error = error.data;
				$location.path('/session/new');
			});
		};
}]);
