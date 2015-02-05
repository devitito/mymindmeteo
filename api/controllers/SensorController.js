/**
 * SensorController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var request = (req.param('filter') === undefined) ? 'sensor-list' : 'sensor-list-filter';

		ElasticService.request(request, {count: req.param('count'), page: req.param('page'), filter: req.param('filter')}, function sensorList(err, list) {
			if (err) return next(err);
			res.json(list);
		});
	},

	suggest: function(req, res, next) {
		ElasticService.request('sensor-list-suggest', {filter: req.param('filter')}, function sensorList(err, list) {
			if (err) return next(err);
			res.json(list);
		});
	},

	random: function(req, res, next) {

		Sensor.count()
		.then(function (count) {
			ElasticService.request('get-random-sensor', {count: count})
			.then (function (sensor) {
				res.send(sensor);
			})
			.catch(function (err) {
				res.json(500, err);
			});
		});
	}
};

