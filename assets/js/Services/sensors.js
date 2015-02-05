/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory('sensorsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};
	var resource = $resource('/sensor/:id', {id:'@id'}, {
		random: {method:'GET', url: '/sensor/random', isArray:false}
	});

	factory.getRandom = function () {
		var deferred = $q.defer();
		resource.random().$promise
		.then(function (sensor) {
			deferred.resolve(sensor);
		})
		.catch(function (error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	return factory;
}]);
