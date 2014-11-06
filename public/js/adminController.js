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
			var stats = angular.fromJson(stats);
			angular.forEach(stats, function(key, value) {
				$scope[value] = {};
				$scope[value].data = statsFactory.populate(value, key);
				$scope[value].type = statsFactory.getType(value);
				$scope[value].options = statsFactory.getOptions(value);
			});
		} catch (e) {
			$scope.errors = 'error';
		};
}]);

adminControllers.controller('sensorsCtrl', ['$scope',  'ngTableParams', '$sce', '$resource', '$timeout', '$rootScope', '$filter', '$q',
    function ($scope, ngTableParams, $sce, $resource, $timeout, $rootScope, $filter, $q) {
		var Api = $resource('/api/admin/sensors/:id', {id: '@id'}, {
			query: {method:'GET', params:{filter: function() {return $scope.filterTxt}}, isArray:false},
			update: {method:'PUT'},
			suggest: {method:'SUGGEST', params:{filter: function() {return $scope.filterTxt}}, isArray:true}
		});

		$scope.tableParams = new ngTableParams({
			page: 1,            // show first page
            count: 10           // count per page
        }, {
        	counts: [], // hide page counts control
        	total:0, // length of data
        	getData: function($defer, params) {
        		$scope.suggestions = [];
        		Api.query(params.url(), function(data) {
        			$timeout(function() {
        				// update table params
        				params.total(data.total);
        				// set new data
        				$defer.resolve(data.result);
        			}, 500);
        		}); 
        	}
        }); 
				
		$scope.doFilter = function () {
			$scope.tableParams.page(1);
			$scope.tableParams.reload();
		};
		
		$scope.update = function(index) {
			var data = $scope.tableParams.settings().$scope.$data[index];
			Api.update(data.id, data,
				function(success) {
					$rootScope.$broadcast('sensor.post.edit');
					data.$edit = false;
				},
				function(errors) {
					//todo
					data.$edit = false;
				}
			);
		};
		
		var doSuggest = function () {
			prevent = true;
			Api.suggest(
				function(success) {
					$scope.suggestions = success;
					prevent = false;
				},
				function(errors) {
					$scope.suggestions = [];
					prevent = false;
				}
			);
		};
		
		$scope.suggestions = [];
		var prevent = false;
		var timer;
		$scope.suggest = function(event) {
			$scope.suggestions = [];
			if (($scope.filterTxt.length > 3) && (event.keyCode != 13) && (prevent == false)) {
				$timeout.cancel(timer);
				timer = $timeout(doSuggest, 1000);
			}
		};
		
		
}]);