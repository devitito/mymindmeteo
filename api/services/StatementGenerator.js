/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var promise = require('bluebird');

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports.generate = function(mindid) {
	var deferred = promise.defer();

	//Get mind's mood
	ElasticService.request('mind-mood', {id: mindid})
	.then(function (mood) {
		//todo: get the list of report with range matching current mind's mood
		Report.count()
		.then(function(count) {
			//pick a random report from this list and generate statement
			Report.findOneById(randomIntFromInterval(1, count+1))
			.then(function (report) {
				console.log(report.template);
				//todo: transform template into plain text
				var statement = {
					body: report.template,
					notread: true,
					mind: mindid,
					report: report.id
				};
				Statement.create(statement)
				.then(function(createdStatement) {
					deferred.resolve(createdStatement);
				})
				.catch(function(err) {
					deferred.reject(err);
				});
			});
		});
	})
	.catch(function (err) {
		deferred.reject(err);
	});

	return deferred.promise;
};
