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
	var val = Math.floor(Math.random()*(max-min+1)+min);
	console.log('report index: '+val);
	return val;
}

function save (deferred, statement) {
	Statement.create(statement)
	.then(function(statement) {
		return Statement.findOneById(statement.id).populate('report');
	})
	.then(function(statement) {
		Mind.findOneById(statement.report.meteologist)
		.then(function (meteologist) {
			console.log(meteologist);
			statement.report.meteologist = {id: meteologist.id, name: meteologist.name} ;
			deferred.resolve(statement);
		});
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

module.exports.generate = function(mindid, options) {
	var deferred = promise.defer();

	//Get mind's mood
	ElasticService.request('mind-mood', {id: mindid})
	.then(function (moodrange) {
		return Report.find()
			.where({category: options.category})
			.where({range: moodrange});
	})
	.then(function (reports) {
		if ((_.isUndefined(reports)) || (_.isEmpty(reports))) {
			deferred.reject("Our meteologist are too busy currently. There is an hurrican somewhere. You are not the center of the world. Try again later.");
			return;
		}

		//pick a random report from this list and generate statement
		var i = randomIntFromInterval(0,reports.length-1);
		processTemplate(deferred, reports[i], mindid);

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
	})
	.catch(function (err) {
		deferred.reject(err);
	});

	return deferred.promise;
};
