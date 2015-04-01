

angular.module('stats', ['ngResource', 'googlechart'])
.controller('statsCtrl', ['$scope', 'data', 'statsFactory',
    function ($scope, data, statsFactory) {
		try {
			var datas = angular.fromJson(data);
			angular.forEach(datas, function(key, value) {
				$scope[value] = {};
				$scope[value].data = statsFactory.populate(value, key);
				$scope[value].type = statsFactory.getType(value);
				$scope[value].options = statsFactory.getOptions(value);
			});
		} catch (e) {
			$scope.errors = 'error';
		};
}])
.factory('statsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};

	factory.query = function (deferred) {
		$resource('/admin/stats/:graph', {}, {
			query: {method:'GET', isArray:false}
		}).query(
			function(data){
    			deferred.resolve(data);
    		}, function(errorData) {
    			deferred.resolve('An error occured while retreiving the stats');
    		});
		return deferred.promise;
	};

	factory.climate = function (id) {
		var deferred = $q.defer();
		$resource('/mind/climate/:id', {}, {
			climate: {method:'GET', params:{id:id}, isArray:false}
		}).climate().$promise
		.then(function(data) {
			console.log(data);
			deferred.resolve(data);
		})
		.catch(function (data) {
			deferred.reject(data);
		});
		return deferred.promise;
	};

	factory.getType = function(stat) {
		switch (stat) {
			case 'sensorPerTopic':
				return 'PieChart';
				break;

			case 'testPerDay':
			case 'testPerHour':
				return 'ColumnChart';
				break;

			default:
				break;
		};
	}

	factory.getOptions = function(stat) {
		switch (stat) {
			case 'sensorPerTopic':
				return {
			     //   'title': 'Sensor per topic',
			        'is3D':true,
			        colors: ['#FF0000', '#00ADEF', '#85bb65'],
			        fontSize: 14,
			    };
				break;

			case 'testPerDay':
				return {
			     //   'title': 'Number of test completed per day of the week',
			        'is3D':true,
			        fontSize: 14,
			        colors : ['#00ADEF'],
			        legend : {position: 'none'}
			    };
				break;

			case 'testPerHour':
				return {
			  //      'title': 'Most popular hours of the day to complete test',
			        'is3D':true,
			        fontSize: 14,
			        colors : ['#00ADEF'],
			        legend : {position: 'none'}
			    };
				break;

			default:
				break;
		};
	}

	populateRows = function (data)
	{
		var rows = [];
		angular.forEach(data, function(value, key) {
			rows.push({c: [{v: key}, {v: value}]});
		});
		return rows;
	};

	populateCols = function (stat)
	{
		switch (stat) {
			case 'sensorPerTopic':
				return [
				      {id: "t", label: "Topic", type: "string"},
				      {id: "s", label: "Sensors", type: "number"}
					];
				break;

			case 'testPerDay':
				return [
				      {id: "d", label: "Days", type: "string"},
				      {id: "c", label: "Test completed", type: "number"}
					];
				break;

			case 'testPerHour':
				return [
				      {id: "h", label: "Hour", type: "string"},
				      {id: "c", label: "Test completed", type: "number"}
					];
				break;

			default:
				break;
		}
	}

	factory.populate = function(stat, data) {
		return { "cols": populateCols(stat), "rows": populateRows(data)};
	};

	return factory;
}]);
