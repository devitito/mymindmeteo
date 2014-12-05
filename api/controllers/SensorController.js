/**
 * SensorController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var count = req.param('count');
		var page = req.param('page');

		ElasticService.request('sensor-list', {count: count, page: page}, function sensorList(err, list) {
			if (err) return next(err);
			res.json(list);
		});

		/*Sensor.find().limit(10).populate('samples').exec(function(err, sensors) {
			if (err) return next(err);

			res.json({result: sensors, total: 10});
		});*/
	},
};

