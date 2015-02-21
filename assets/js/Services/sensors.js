/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


adminServices.factory('sensorFactory', ['$resource', function($resource){
	return $resource('/sensor/:id', {id: '@id'}, {
		query: {method:'GET', url:'/sensor/query', isArray:false},
		update: {method:'PUT'},
		suggest: {method:'GET', url:'/sensor/suggest', isArray:true}
	});
}]);

adminServices.factory('sensorStatus', [function(){
	return [{code:'unapproved', name:'Unapproved'},
	        {code:'approved', name:'Approved'},
	        {code:'assigned', name:'Assigned'}];
}]);

mindServices.factory('sensorsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};
	var resource = $resource('/sensor/:id', {id:'@id'}, {
		random: {method:'GET', url: '/sensor/random', isArray:false}
	});

	factory.resource = function () {
		return resource;
	}

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
	};

	factory.getTopics = function() {
		return [
			{code: 'love', name: 'Love'},
			{code: 'health', name: 'Health'},
			{code: 'money', name: 'Money'}];
	};

	return factory;
}]);
