/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


angular.module('statement', ['ngResource'])
  .factory('statementsFactory', ['$resource', '$q', function($resource, $q){
	var factory = $resource('/statement/:id', {id:'@id'}, {
		bymind: {method: 'GET', url: '/statement/bymind'},
		generate: {method: 'POST', url: '/statement/generate'}
	});

	return factory;
}]);
