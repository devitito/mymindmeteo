var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mindsCtrl', ['$scope', '$location', 'minds',
    function ($scope, $location, minds) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };
	    
	    $scope.minds = minds;
	 /*   mindFactory.query(
	    	function(data){
	    		$scope.minds = data;
	    	},
	    	function(error) {
	    		$scope.error = 'An error occured while retreiving the list of minds';
	    });*/
}]);

/*
adminControllers.controller('EditMindCtrl', ['$scope', '$location', 'mindFactory', '$routeParams', '$http',
    function ($scope, $location, mindFactory, $routeParams, $http) {
	 	$scope.go = function (url) {
	      $location.path(url);
	    };
	    
	    $scope.roles = ['guest', 'demo', 'mind', 'meteologist', 'validator', 'admin'];
	    
	/*    $scope.langs = [{code:'fr', name:'french'},
	                    {code:'en', name:'english'}];
	    */
/*	    $scope.langs = ['fr', 'en'];
	    
	    mindFactory.get({id:$routeParams.mindId}, 
	    	function(data){
    			$scope.mind = data;
    		},
	    	function(error) {
	    		$scope.error = 'An error occured while retreiving the mind data';
	    });
}]);*/

adminControllers.controller('EditMindCtrl', ['$scope', '$location', 'mind',
    function ($scope, $location, mind, $routeParams) {
		$scope.go = function (url) {
			$location.path(url);
		};
		
		$scope.roles = ['guest', 'demo', 'mind', 'meteologist', 'validator', 'admin'];
		$scope.langs = ['fr', 'en'];
		$scope.mind = mind;
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