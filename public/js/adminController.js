var adminControllers = angular.module('adminControllers', []);

var mindsCtrl = adminControllers.controller('mindsCtrl', ['$scope', '$location', 'minds', 'lang', 'identity',
    function ($scope, $location, minds, lang, identity) {
	    $scope.go = function (url) {
	      $location.path(url);
	    };
	    
	    $scope.langtools = lang;
	    $scope.locale = identity.locale;
	    
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

var EditMindCtrl = adminControllers.controller('EditMindCtrl', ['$scope', '$rootScope', '$location', 'mind', 'roles', 'flash', 'lang',
    function ($scope, $rootScope, $location, mind, roles, flash, lang) {
		$scope.go = function (url) {
			$location.path(url);
		};
		
		$scope.updateMind = function() {
			$scope.mind.$update(
				function(success) {
					$rootScope.$broadcast('mind.post.edit', mind);
					flash.setMessage('Mind updated successfully!');
					$location.path('/minds/edited/result/'+$scope.mind.id+'/1');
				},
				function(errors) {
					$scope.errors = [];
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while applying the changes');
					}
					$location.path('/minds/edited/result/'+$scope.mind.id+'/0');
				}
			);
		};
		
		$scope.roles = roles;
		$scope.langs = lang.list(mind.locale);
		
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

var EditedMindCtrl = adminControllers.controller('EditedMindCtrl', ['$scope', '$location', 'flash', '$routeParams',
    function ($scope, $location, flash, $routeParams) {
		$scope.go = function (url) {
			$location.path(url);
		};
		
		$scope.id = $routeParams.id;
		$scope.result = $routeParams.result;
		$scope.flash = flash;
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