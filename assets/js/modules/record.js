

angular.module('record', ['ngResource'])
.factory('recordsFactory', ['$resource', '$q',
	function($resource, $q){
	var factory = {};
	var resource = $resource('/record/:id', {id:'@id'}, {
		saveBulk: {method: 'POST', url: '/record/saveBulk'}
	});

	factory.save = function (mindid, records) {
		var deferred = $q.defer();
		resource.saveBulk({}, {records: records}).$promise
		.then(function (success) {
			deferred.resolve(success);
		})
		.catch(function (error) {
			deferred.reject(error);
		});
		//deferred.resolve('ok');
		return deferred.promise;
	}

	return factory;
}]);
