
angular.module('guest', ['session', 'flashMsg', 'mind'])
.controller('guestCtrl', ['$scope', '$location', '$anchorScroll', 'sessionFactory', 'flash',
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
}])
.controller('newSessionCtrl', ['$scope', '$location', '$window', 'sessionFactory',
    function ($scope, $location, $window, sessionFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.new = function () {
			sessionFactory.create({nameoremail: $scope.nameoremail, password: $scope.password})
			.then(function(success) {
				if (success.role == 'admin')
						//$scope.go('/administrator/');
                   $window.location.href = '/administrator/';
				else
						$scope.go('/mind/dashboard/' + success.name);
			})
			.catch(function(error) {
				$scope.error = error.data;
				$location.path('/session/new');
			});
		};
}])
.controller('guestRegCtrl', ['$scope', '$location', 'mindFactory', 'sessionFactory',
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

