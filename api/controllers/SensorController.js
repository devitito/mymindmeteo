/**
 * SensorController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	query: function(req, res, next) {
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

	listBy: function(req, res, next) {
		var field = req.query.field;
		var value = req.query.value;
		var options;

		if ((field == undefined) || (value == undefined))
			options = {};
		else
			options = {field: field, value: value};

		ElasticService.request('sensor-list-by', options)
		.then (function (sensors) {
			res.send(sensors);
		})
		.catch(function (err) {
			res.json(500, err);
		});
	}
};

