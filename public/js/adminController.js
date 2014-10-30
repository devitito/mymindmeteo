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

var EditMindCtrl = adminControllers.controller('EditMindCtrl', ['$scope', '$rootScope', '$location', 'mind', 'roles', 'flash', 'lang', 'timezones', 'identity', 'identityService',
    function ($scope, $rootScope, $location, mind, roles, flash, lang, timezones, identity, identityService) {
		$scope.go = function (url) {
			$location.path(url);
		};
		
		$scope.update = function() {
			$scope.mind.$update(
				function(success) {
					$rootScope.$broadcast('mind.post.edit', mind);
					flash.setMessage('Mind updated successfully!');
					$location.path('/minds/edited/result/'+$scope.mind.id+'/1');
				},
				function(errors) {
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
		
		$scope.delete = function () {
			$scope.mind.$delete(
				function(success) {
					flash.setMessage('Mind deleted successfully!');
					$location.path('/minds/delete/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while deleting the mind');
					}
					$location.path('/minds/delete/0');
				}
			);
		}
		
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.langs = lang.list(identity.locale);
	
		if (angular.isObject(mind)) {
			$scope.mind = mind;
			$scope.isSelf = identityService.isSelf(mind.id);
		}
		else {
			flash.setMessage('An error occured while fetching the data');
			$location.path('/minds/edited/result/0/1');
		}
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
  },
  identity: function(identityService, $q) {
		var deferred = $q.defer();
		return identityService.get(deferred);
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
			$scope.recovery_date = '  In progress. Wait...';
			recovery.query(
				function(data){
					console.log(data[0]);
					$scope.recovery_date = '  Indexes re-created on : ' + data[0].toString();
	            },
	            function(error) {
	            	$scope.error = 'An error occured while recovering the undindexed records';
	  	    		//todo display error
	           });
		}
}]);

var NewMindCtrl = adminControllers.controller('NewMindCtrl', ['$scope', '$location', '$q', 'flash', 'roles', 'identity', 'lang', 'timezones', 'mindFactory',
    function ($scope, $location, $q, flash, roles, identity, lang, timezones, mindFactory) {
		$scope.go = function (url) {
			$location.path(url);
		};

		$scope.langs = lang.list(identity.locale);
		$scope.roles = roles;
		$scope.timezones = timezones;
		$scope.flash = flash;
		
		$scope.create = function() {
			mindFactory.save($scope.mind,
				function(success) {
					flash.setMessage('Mind created successfully!');
					$location.path('/minds/edited/result/'+success.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (value) {
							flash.setMessage(value);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while creating the mind.');
					}
					$location.path('/minds/edited/result/0/1');
			});
		};
}]);       

var statsCtrl = adminControllers.controller('statsCtrl', ['$scope', 'stats', 'statsFactory',
    function ($scope, stats, statsFactory) {
		try {
			var sensorPerTopicRaw = angular.fromJson(stats).sensorPerTopic;
			$scope.sensorPerTopic = {};
			var cols = [
			       {id: "t", label: "Topic", type: "string"},
			       {id: "s", label: "Sensors", type: "number"}
			];

			var rows = [];
			statsFactory.populateRows(rows, sensorPerTopicRaw);
			
			$scope.sensorPerTopic.data = { "cols": cols, "rows": rows};
			$scope.sensorPerTopic.type = 'PieChart';
		    $scope.sensorPerTopic.options = {
		        'title': 'Sensor per topic',
		        'is3D':true,
		        colors: ['#FF0000', '#00ADEF', '#85bb65'],
		        fontSize: 14,
		    };
		    
		    /**
		     * *************************************************
		     */
		    var testPerDayRaw = angular.fromJson(stats).testPerDay;
			$scope.testPerDay = {};
			
			cols = [
			       {id: "d", label: "Days", type: "string"},
			       {id: "c", label: "Test completed", type: "number"}
			];

			rows = [];
			statsFactory.populateRows(rows, testPerDayRaw);
			
			$scope.testPerDay.data = { "cols": cols, "rows": rows};
			$scope.testPerDay.type = 'ColumnChart';
		    $scope.testPerDay.options = {
		        'title': 'Number of test completed per day of the week',
		        'is3D':true,
		        fontSize: 14,
		        legend : {position: 'none'}
		    };
		    
		} catch (e) {
			$scope.errors = 'error';
		};
}]);

adminControllers.controller('sensorsCtrl', ['$scope', 
    function ($scope) {
	
}]);