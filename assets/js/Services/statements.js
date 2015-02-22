/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


mindServices.factory('statementsFactory', ['$resource', '$q', function($resource, $q){
	var factory = $resource('/statement/:id', {id:'@id'}, {
		bymind: {method: 'GET', url: '/statement/bymind'},
		generate: {method: 'GET', url: '/statement/generate'}
	});

	return factory;
}]);
