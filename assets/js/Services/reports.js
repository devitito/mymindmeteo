/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


mindServices.factory('reportsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};

	factory.query = function (id) {
		var deferred = $q.defer();
		if (id == 1)
			deferred.resolve([
								{
									title: 'About my salary raise',
									category: 'Profesional',
									createdOn: moment(),
									meteologist: 'MindMeteo'
								},
								{
									title: 'Hello!',
									category: 'Friends',
									createdOn: moment(),
									meteologist: 'MindMeteo'
								},
								{
									title: 'Here are the news flash you are all waiting for',
									category: 'Family',
									createdOn: moment(),
									meteologist: 'MindMeteo'
								},
								{
									title: 'Mimimi',
									category: 'Lover',
									createdOn: moment(),
									meteologist: 'MindMeteo'
								}
							]);
		else
			deferred.resolve([]);
		return deferred.promise;
	}

	return factory;
}]);
