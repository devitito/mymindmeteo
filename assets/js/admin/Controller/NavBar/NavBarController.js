/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var adminNavBarCtrl = adminControllers.controller('adminNavBarCtrl', ['$scope', '$location', 'identityService', 'sessionFactory',
  function ($scope, $location, identityService, sessionFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		identityService.get()
		.then(function(identity) {
			$scope.identity = identity;
		});

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
