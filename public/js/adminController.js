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