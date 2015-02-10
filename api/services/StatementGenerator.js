/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var promise = require('bluebird');

module.exports.generate = function(mindid) {
	var deferred = promise.defer();

	//Get mind's mood
	ElasticService.request('mind-mood', {id: mindid})
	.then(function (mood) {
		//get the list of report with range matching current mind's mood
		//pick a random report from this list and generate statement
		var statement = {
			body: 'some body',
			notread: true,
			mind: mindid,
			report: 2
		};
		Statement.create(statement)
		.then(function(createdStatement) {
			deferred.resolve(createdStatement);
		})
		.catch(function(err) {
			deferred.reject(err);
		});
	}).catch(function (err) {
		deferred.reject(err);
	});

	return deferred.promise;
};
