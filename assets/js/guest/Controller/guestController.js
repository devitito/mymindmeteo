
var homepageCtrl = guestControllers.controller('homepageCtrl', ['$scope', '$location', '$anchorScroll', 'sessionFactory', 'flash',
    function ($scope, $location, $anchorScroll, sessionFactory, flash) {
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

			$scope.gotoAnchor = function(id) {
				if ($location.hash() !== id) {
					// set the $location.hash to `newHash` and
					// $anchorScroll will automatically scroll to it
					$location.hash(id);
				} else {
					// call $anchorScroll() explicitly,
					// since $location.hash hasn't changed
					$anchorScroll();
				}
		};
}]);

