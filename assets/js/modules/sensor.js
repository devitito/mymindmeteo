

angular.module('sensor', ['ngResource', 'ngTable', 'flashMsg', 'ui.bootstrap'])
.controller('sensorsCtrl', ['$scope',  'ngTableParams', '$resource', '$timeout', '$location', 'sensorsCache', 'sensorFactory',
    function ($scope, ngTableParams, $resource, $timeout, $location, sensorsCache, sensorFactory) {
			var timer;
			var prevent = false;
			var page = (sensorsCache.get('page') === undefined) ? 1 : sensorsCache.get('page');
			var filter = (sensorsCache.get('fitlerTxt') === undefined) ? new Object() : sensorsCache.get('fitlerTxt');//sensorsCache.get('fitlerTxt');

			$scope.suggestions = [];
			$scope.filterTxt = sensorsCache.get('fitlerTxt');

			$scope.tableParams = new ngTableParams({
				page: page,            // show saved page
				count: 10,           // count per page
				filter: filter
			}, {
				counts: [], // hide page counts control
				total:0, // length of data
				getData: function($defer, params) {
					$scope.suggestions = [];
					sensorFactory.query(params.url(), function(data) {
						sensorsCache.set('page', params.page());
						page = params.page();
						$timeout(function() {
							// update table params
							params.total(data.total);
							// set new data
							$defer.resolve(data.result);
							prevent = false;
						}, 500);
					});
				}
			});

			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.doFilter = function () {
				prevent = true;
				$scope.tableParams.parameters({'filter':$scope.filterTxt}, true);
				$scope.tableParams.page(1);
				sensorsCache.set('fitlerTxt', $scope.filterTxt);
				//table is reloaded when params changes
				//$scope.tableParams.reload();
			};

			var doSuggest = function () {
				prevent = true;
				sensorFactory.suggest({'filter':$scope.filterTxt},
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

			$scope.suggest = function(event) {
				$scope.suggestions = [];
				$timeout.cancel(timer);
				if (($scope.filterTxt.length > 3) && (event.keyCode != 13) && (prevent == false)) {
					timer = $timeout(doSuggest, 500);
				}
			};
}])
.controller('NewSensorCtrl', ['$scope', '$location', 'sensorStatus', 'flash', 'meteologistList', 'sensorsFactory',
  function ($scope, $location, sensorStatus, flash, meteologistList, sensorsFactory) {
		$scope.statusList = sensorStatus;
		$scope.meteologistList = meteologistList;
		$scope.topicList = sensorsFactory.getTopics();
		$scope.flash = flash;

		$scope.create = function() {
			$scope.sample1.topic = $scope.sensor.topic;
			$scope.sample2.topic = $scope.sensor.topic;
			$scope.sensor.samples = [$scope.sample1, $scope.sample2];
			sensorsFactory.resource().save($scope.sensor,
				function(success) {
					flash.setMessage('Sensor created successfully!');
					$location.path('/result/sensors/'+success.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (value) {
							flash.setMessage(value);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while creating the sensor.');
					}
					$location.path('/result/sensors/0/1');
			});
		};

		$scope.go = function (url) {
			$location.path(url);
		};
}])
.controller('EditSensorCtrl', ['$scope', '$location', 'item', 'sensorStatus', 'flash', '$modal',
    function ($scope, $location, item, sensorStatus, flash, $modal) {
		$scope.statusList = sensorStatus;
		$scope.sensor = item;

		$scope.update = function() {
			$scope.sensor.$update(
				function(success) {
					flash.setMessage('Sensor updated successfully!');
					$location.path('/result/sensors/'+$scope.sensor.id+'/1');
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
					$location.path('/result/sensors/'+$scope.sensor.id+'/0');
				}
			);
		};

		var doDelete = function () {
			$scope.sensor.$delete(
				function(success) {
					flash.setMessage('Sensor deleted successfully!');
					$location.path('/result/sensors/'+$scope.sensor.id+'/1');
				},
				function(errors) {
					try {
						var list = angular.fromJson(errors).data;
						angular.forEach(list, function (key, value) {
							flash.setMessage(angular.fromJson(key).recordFound);
						}) ;
					} catch (e) {
						flash.setMessage('An error occured while deleting the sensor');
					}
					$location.path('/result/sensors/'+$scope.sensor.id+'/0');
				}
			);
		};

		$scope.delete = function () {
			var modalInstance = $modal.open({
			      templateUrl: '/templates/administrator/modals/confirm/confirm.html',
			      controller: 'ConfirmModalCtrl',
			    });

			modalInstance.result.then(function () {
			      doDelete();
			    }, function () {
			      //nothing to do
			    });
		};

		$scope.go = function (url) {
			$location.path(url);
		};
}])
.factory("sensorsCache", ['$cacheFactory',
	function($cacheFactory) {
		var factory = {};
		var cache = $cacheFactory('sensors');

		factory.get = function(obj) {
			return cache.get(obj);
		};

		factory.set = function(obj, value) {
			cache.put(obj, value);
		};

		return factory;
}])
.factory('sensorsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};
	var resource = $resource('/sensor/:id', {id:'@id'}, {
		listBy: {method:'GET', url: '/sensor/listBy', isArray:true}
	});

	factory.resource = function () {
		return resource;
	}

	factory.listBy = function (options) {
		var deferred = $q.defer();
		resource.listBy(options).$promise
		.then(function (sensor) {
			deferred.resolve(sensor);
		})
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	factory.getTopics = function() {
		return [
			{code: 'love', name: 'Love'},
			{code: 'health', name: 'Health'},
			{code: 'money', name: 'Money'}];
	};

	return factory;
}])
.factory('sensorStatus', [function(){
	return [{code:'unapproved', name:'Unapproved'},
	        {code:'approved', name:'Approved'},
	        {code:'assigned', name:'Assigned'}];
}])
.factory('sensorFactory', ['$resource', function($resource){
	return $resource('/sensor/:id', {id: '@id'}, {
		query: {method:'GET', url:'/sensor/query', isArray:false},
		update: {method:'PUT'},
		suggest: {method:'GET', url:'/sensor/suggest', isArray:true}
	});
}]);


