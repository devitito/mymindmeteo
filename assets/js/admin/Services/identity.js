/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory('identityService', ['$resource', '$rootScope', '$q', 'moment', 'localStorageService', function($resource, $rootScope, $q, moment, localStorageService){
	var factory = {};
	//var cache = $cacheFactory('identity');

	$rootScope.$on("mind.post.edit", function(event, args) {
		//Remove current identity from cache if it was modified
		if (args.id == factory.getId()) {
			//cache.removeAll();
			factory.set(args);
		}
	});

	factory.getId = function () {
		var localid = localStorageService.get('identity');
		if (localid) return localStorageService.get('identity').id;
		else return null;
	};

	factory.get = function () {
		var deferred = $q.defer();
		var localid = localStorageService.get('identity');
		if (localid) {
			moment.locale(localid.locale);
			deferred.resolve(localid);
		}
		else deferred.reject('An error occured while retreiving the identity');

		return deferred.promise;
	};

	factory.set = function(data) {
		localStorageService.set('identity', data);
		moment.locale(data.locale);
	};

	factory.remove = function () {
		localStorageService.remove('identity');
	};

	factory.isSelf = function (id) {
		if (id == factory.getId())
			return true;
		else
			return false;
	};

	return factory;
}]);
