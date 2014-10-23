var adminControllers = angular.module('adminControllers', []);

var mindsCtrl = adminControllers.controller('mindsCtrl', ['$scope', '$location', 'minds',
    function ($scope, $location, minds) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };
	    
	    if (angular.isArray(minds))
			$scope.minds = minds;
		else
			$scope.error = minds;
}]);

/*
mindsCtrl.resolve = {
	minds: function(mindFactory, $q) {
		var deferred = $q.defer();
		mindFactory.query(
			function(data){
				deferred.resolve(data); 
			}, function(errorData) {
				deferred.resolve('An error occured while retreiving the list of minds');
			});
		return deferred.promise;
	}
};
*/
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

var EditMindCtrl = adminControllers.controller('EditMindCtrl', ['$scope', '$location', 'mind', 'roles',
    function ($scope, $location, mind, roles, mindFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};
		
		$scope.updateMind = function() {
			$scope.mind.$update(
				function(success) {
					$scope.go('/minds');
				},
				function(errors) {
					$scope.errors = [];
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							$scope.errors.push(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						$scope.errors.push('An error occured while applying the changes');
				}
			);
		};
		
		$scope.roles = roles;
		$scope.langs = ['fr', 'en'];
		if (angular.isObject(mind))
			$scope.mind = mind;
		else
			$scope.error = mind;
}]);

EditMindCtrl.resolve = {
	mind: function(mindFactory, $q, $route) {
	  var deferred = $q.defer();
	  mindFactory.get({id:$route.current.params.mindId},
		  function(data){
			  deferred.resolve(data); 
		  }, function(errorData) {
			  deferred.resolve('An error occured while retreiving the requested data');
	});
	return deferred.promise;
  }
};

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