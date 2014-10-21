var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mindsCtrl', ['$scope', 'minds', 
    function ($scope, minds) {
		minds.query(
	    	function(data){
	    		$scope.minds = data;
	    	},
	    	function(error) {
	    		$scope.error = 'An error occured while retreiving the list of minds';
	    		//todo display error
	  });
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