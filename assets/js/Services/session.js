
guestServices.factory('sessionFactory', ['$resource', '$q', '$http', 'identityService', function($resource, $q, $http, identityService){
	var factory = {};

	var resource = $resource('/session', {}, {
		create: {method:'POST', url:'/session/create'},
		destroy: {method: 'GET', url:'/session/destroy'}
	});

	factory.create = function (credentials) {
		var deferred = $q.defer();

		resource.create({}, credentials).$promise
		.then(function(success) {
			identityService.set(success);
			deferred.resolve(success);
		})
		.catch(function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	factory.destroy = function () {
		var deferred = $q.defer();

		resource.destroy().$promise
		.then(function(success) {
			identityService.remove();
			$http.get('/csrfToken').success(function(data){
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
				deferred.resolve();
    	}).error(function(data) {
				deferred.resolve(data);
			});

		})
		.catch(function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	return factory;
}]);