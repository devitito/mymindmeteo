/**
 * SensorController
 *
 * @description :: Server-side logic for managing sensors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var replaceSpaceByAnd = function(str) {
	return str.replace(' ', ' AND ');
};

module.exports = {
	index: function(req, res, next) {
		var decodedFilter;
		var request = ((req.param('filter') === undefined) || (req.param('filter') == '')) ? 'sensor-list' : 'sensor-list-filter';

		if (request == 'sensor-list-filter') {
			var decodedFilter = replaceSpaceByAnd(decodeURIComponent(req.param('filter')));
		}

		ElasticService.request(request, {count: req.param('count'), page: req.param('page'), filter: decodedFilter}, function sensorList(err, list) {
			if (err) return next(err);
			res.json(list);
		});
	},

	suggest: function(req, res, next) {
		var decodedFilter = replaceSpaceByAnd(decodeURIComponent(req.param('filter')));

		ElasticService.request('sensor-list-suggest', {filter: decodedFilter}, function sensorList(err, list) {
			if (err) return next(err);
			res.json(list);
		});
	}
};

