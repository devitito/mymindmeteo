/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */


mindServices.factory('statementsFactory', ['$resource', '$q', function($resource, $q){
	var factory = {};

	factory.query = function (id) {
		var deferred = $q.defer();
		if (id == 1)
			deferred.resolve([
				{
					title: 'About my salary raise',
					category: 'Profesional',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Hello!',
					category: 'Friends',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Here are the news flash you are all waiting for',
					category: 'Family',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Mimimi',
					category: 'Lover',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				}
			]);
		else
			deferred.resolve([]);
		return deferred.promise;
	};

	factory.generate = function (id) {
		var deferred = $q.defer();

		setTimeout(function () {
			deferred.resolve(
			[
				{
					title: 'Holiday request',
					category: 'Profesional',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: true,
					body: {},
				},
				{
					title: 'High five dude!',
					category: 'Friends',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: true,
					body: {},
				},
				{
					title: "I can't come for the next family meeting",
					category: 'Family',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: true,
					body: {},
				},
				{
					title: 'Baybay! You are ying I am yang',
					category: 'Lover',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: true,
					body: {},
				},
				{
					title: 'About my salary raise',
					category: 'Profesional',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Hello!',
					category: 'Friends',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Here are the news flash you are all waiting for',
					category: 'Family',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				},
				{
					title: 'Mimimi',
					category: 'Lover',
					createdOn: moment(),
					meteologist: 'MindMeteo',
					notread: false,
					body: {},
				}
			]);
		}, 5000);

		return deferred.promise;
	};

	return factory;
}]);
