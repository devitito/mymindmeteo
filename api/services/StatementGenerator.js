/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var promise = require('bluebird');
var Readable = require('stream').Readable

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function save (deferred, statement) {
	Statement.create(statement)
	.then(function(createdStatement) {
		deferred.resolve(createdStatement);
	})
	.catch(function(err) {
		deferred.reject(err);
	});
};

function processTemplate(deferred, report, mindid) {
	//Convert report.template into stream
	var input = new Readable;
	input.setEncoding('utf8');
	input.push(report.template)
	input.push(null)      // indicates end-of-file basically - the end of the stream

	//Throw report.template through the report parser
	var parser = ReportParser.new({decodeStrings: false, mindid: mindid});
	input.pipe(parser);

	//collect the output stream in a string
	var body = '';
	parser.on('data', function(chunk) {
  	body += chunk;
	});

	//Handle streams events
	parser.on('end', function() {
		var statement = {
			body: body,
			notread: true,
			mind: mindid,
			report: report.id
		};

		save(deferred, statement);
	});

	parser.on('error', function(err) {
		deferred.reject(err);
	});
};

module.exports.generate = function(mindid) {
	var deferred = promise.defer();

	//Get mind's mood
	ElasticService.request('mind-mood', {id: mindid})
	.then(function (mood) {
		//todo: get the list of report with range matching current mind's mood
		Report.count()
		.then(function(count) {
			//pick a random report from this list and generate statement
			Report.findOneById(randomIntFromInterval(1, count))
			.then(function (report) {
				if (_.isUndefined(report)) {
					deferred.reject("Our meteologist are too busy currently. There is an hurrican somewhere. You are not the center of the world. Try again later.");
					return;
				}
				processTemplate(deferred, report, mindid);

				/*var domain = require('domain');
				var d = domain.create();
				// Domain emits 'error' when it's given an unhandled error
				d.on('error', function(err) {
					var error = new Error();
					error.message = err.message;
					deferred.reject(error);
				});

				d.run(function() {
					processTemplate(deferred, report, mindid);
				});*/
			});
		});
	})
	.catch(function (err) {
		deferred.reject(err);
	});

	return deferred.promise;
};
