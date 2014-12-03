/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

module.exports = {
	index: function(req, res, next) {
		res.view();
	},

	'online': function(req, res) {
		res.json(req.session.Mind);
	},

	'recreate-indexes': function(req, res, next) {
		Sensor.find({}, function(err, sensors) {
			for(var i = 0, len = sensors.length; i < len; i++)
				console.log(sensors[i].label);
		});
		res.send(200);
	}
};

