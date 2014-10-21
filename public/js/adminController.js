var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mindsCtrl', ['$scope', 'minds', '$location',
    function ($scope, minds, $location) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };
		minds.query(
	    	function(data){
	    		$scope.minds = data;
	    	},
	    	function(error) {
	    		$scope.error = 'An error occured while retreiving the list of minds';
	    		//todo display error
	  });
}]);

adminControllers.controller('EditMindCtrl', ['$scope', '$location',
    function ($scope, $location) {
	 	$scope.go = function (url) {
	      $location.path(url);
	    };
		$scope.mind = {};
		var load = function() {
			console.log('call load()...');
			/*$http.get('api/admin/mind/fetch/' + $routeParams['mindId'])
				.success(function(data, status, headers, config) {
				$scope.mind = data.data;
				angular.copy($scope.mind, $scope.copy);
			});*/
			$scope.mind.name = 'test';
			};
		load(); 
}]);

adminControllers.controller('dashboardCtrl', ['$scope', 'recovery',
    function ($scope, recovery) {
		$scope.recover = function () {
			recovery.query(
				function(data){
					$scope.recovery_date = '  Last recovery : ' + data[0].toString();
	            },
	            function(error) {
	            	$scope.error = 'An error occured while recovering the undindexed records';
	  	    		//todo display error
	           });
		}
}]);

adminControllers.controller('statsCtrl', ['$scope', 
    function ($scope) {
}]);

adminControllers.controller('sensorsCtrl', ['$scope', 
    function ($scope) {
	
}]);