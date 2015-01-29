/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory("sensorsCache", function($cacheFactory) {
	var factory = {};
	var cache = $cacheFactory('sensors');

	factory.get = function(obj) {
		return cache.get(obj);
	};

	factory.set = function(obj, value) {
		cache.put(obj, value);
	};

	return factory;
});
