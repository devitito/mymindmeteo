/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

mindServices.factory('sensorsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};

	/*factory.query = function (deferred) {
		$resource('/admin/stats/:graph', {}, {
			query: {method:'GET', isArray:false}
		}).query(
			function(data){
    			deferred.resolve(data);
    		}, function(errorData) {
    			deferred.resolve('An error occured while retreiving the stats');
    		});
		return deferred.promise;
	};*/

	factory.getRandom = function () {
		var deferred = $q.defer();
		deferred.resolve({
			label: 'a label ' + Math.random(),
			id : Math.random(),
			samples: {
				pos: {
					label: 'pos label '+ Math.random(),
					id: Math.random()
				},
				neg: {
					label: 'neg label '+ Math.random(),
					id: Math.random()
				}
			}
		});
		return deferred.promise;
	}

	return factory;
}]);
