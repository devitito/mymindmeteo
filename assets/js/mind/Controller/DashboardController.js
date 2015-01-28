/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var mindDashboardCtrl = mindControllers.controller('mindDashboardCtrl', ['$scope', '$location', 'identity', 'flash', 'sessionFactory',
    function ($scope, $location, identity, flash, sessionFactory) {
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
			}
}]);
