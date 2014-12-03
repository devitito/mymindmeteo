/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory('identityService', ['$resource', '$cacheFactory', '$rootScope', 'moment', function($resource, $cacheFactory, $rootScope, moment){
	var factory = {};
	var cache = $cacheFactory('identity');

	$rootScope.$on("mind.post.edit", function(event, args) {
		//Remove current identity from cache if it was modified
		if (args.id == factory.getId()) {
			cache.removeAll();
		}
	});

	factory.getId = function () {
		if (cache.info().size == 0)
			return null;

		return cache.get('id');
	};

	factory.get = function (deferred) {
		if (cache.info().size == 0) {
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
			//console.log(identity);
			deferred.resolve(identity);
		}
		return deferred.promise;
	};

	factory.set = function(data) {
		cache.put('id', data.id);
		cache.put('email', data.email);
		cache.put('joindate', data.joindate);
		moment.locale(data.locale);
		cache.put('locale', data.locale);
		cache.put('name', data.name);
		cache.put('role', data.role);
		cache.put('timezone', data.timezone);
	};

	factory.isSelf = function (id) {
		if (id == factory.getId())
			return true;
		else
			return false;
	};

	return factory;
}]);
