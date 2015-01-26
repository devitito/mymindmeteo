/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		res.view();
	},

	'online': function(req, res) {
		res.json(req.session.Mind);
	},

	'resetIndices': function(req, res, next) {
		ElasticService.resetIndices()
		.then(function (result) {
			res.send(200);
		})
		.catch(function (e) {
			next(e);
		});
	},

	'stats': function(req, res, next) {

			async.parallel( {
				sensorPerTopic: function (cb) {
					ElasticService.request('sensor-per-topic', {})
					.then(function (reqRes) {
						cb(null, reqRes);
					}).catch(function (err) {
						cb(err);
					});
				},
				'mostPopularSensor' : function (cb) {
					cb(null, [
					{'1' : ['How is your caca?', '1021']},
					{'2' : ['Did you run out of toilet paper today?', '543']},
					{'3' : ['Did you quit your job today?', '521']},
					{'4' : ['What\'s your plan for tonight?', '328']},
					{'5' : ['Did you score yesterday?', '196']}
				])},
				'testPerDay' : function(cb) {
					cb(null, {'0': 5, '1': 2, '2': 5, '3': 9, '4': 5, '5':7, '6':6})
				},
				'testPerHour' : function (cb) {
					ElasticService.request('test-per-hour', {})
					.then(function (reqRes) {
						cb(null, reqRes);
					}).catch(function (err) {
						cb(err);
					});
				}
			},
			function (err, results) {
				if (err) return next(err);
				else res.json(results);
			});
	}
};

