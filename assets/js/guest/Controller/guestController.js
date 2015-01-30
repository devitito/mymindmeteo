
var homepageCtrl = guestControllers.controller('homepageCtrl', ['$scope', '$location', 'sessionFactory', 'flash',
    function ($scope, $location, sessionFactory, flash) {
			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.takeTourNow = function () {
				sessionFactory.create({nameoremail: 'demo', password: 'demodemo'})
				.then(function(success) {
					$scope.go('/mind/dashboard/' + success.name);
				})
				.catch(function(error) {
					flash.setMessage(error.data);
					$location.path('/session/new');
				});
			};
}]);

