

angular.module('dashboard', ['ngResource', 'session'])
  .controller('dashboardCtrl', ['$scope', 'recovery', 'identity',
    function ($scope, recovery, identity) {
      $scope.recover = function () {
        $scope.result = '  In progress. Wait...';
        recovery.query(
          function(data){
            $scope.result = '  Indexes re-created on : ' + moment().locale(identity.locale).format('lll');
          },
          function(error) {
            try {
              $scope.result = '  ' + error.data.message;
            } catch (e) {
              $scope.result = '  An error occured while re indexing the records';
            }
          });
      }
}])
.controller('adminNavBarCtrl', ['$scope', '$window', 'identityService', 'sessionFactory',
  function ($scope, $window, identityService, sessionFactory) {
		/*$scope.go = function (url) {
			$location.path(url);
		};
*/
		identityService.get()
		.then(function(identity) {
			$scope.identity = identity;
		});

		$scope.logout = function () {
			sessionFactory.destroy()
			.then(function(success) {
              $window.location.href = '/';
			})
			.catch(function(error) {
				//todo display error
			});
		}
}])
.factory('recovery', ['$resource',
  function($resource){
    return $resource('/admin/resetIndices', {}, {
      query: {method:'GET', isArray:false}
    });
}]);
