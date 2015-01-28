/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory('identityService', ['$resource', /*'$cacheFactory',*/ '$rootScope', '$q', 'moment', 'localStorageService', function($resource, /*$cacheFactory,*/ $rootScope, $q, moment, localStorageService){
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
		/*if (cache.info().size == 0)
			return null;

		return cache.get('id');*/
		var localid = localStorageService.get('identity');
		if (localid) return localStorageService.get('identity').id;
		else return null;
	};

	factory.get = function () {
		var deferred = $q.defer();
		/*if (cache.info().size == 0) {
			//nothing cached yet
			$resource('/admin/online').get(
			    function(data){
					factory.set(data);
    				deferred.resolve(data);
    			}, function(errorData) {
    				deferred.resolve('An error occured while retreiving the identity');
    			});
		}
		else {
			var identity = [];
			identity.id = cache.get('id');
			identity.email = cache.get('email');
			identity.joindate = cache.get('joindate');
			identity.locale = cache.get('locale');
			moment.locale(identity.locale);
			identity.name = cache.get('name');
			identity.role = cache.get('role');
			identity.timezone = cache.get('timezone');
			deferred.resolve(identity);
		}*/

		var localid = localStorageService.get('identity');
		if (localid) deferred.resolve(localid);
		else deferred.reject('An error occured while retreiving the identity');

		return deferred.promise;
	};

	factory.set = function(data) {
		localStorageService.set('identity', data);
		/*cache.put('id', data.id);
		cache.put('email', data.email);
		cache.put('joindate', data.joindate);
		moment.locale(data.locale);
		cache.put('locale', data.locale);
		cache.put('name', data.name);
		cache.put('role', data.role);
		cache.put('timezone', data.timezone);*/
	};

	factory.isSelf = function (id) {
		if (id == factory.getId())
			return true;
		else
			return false;
	};

	return factory;
}]);
