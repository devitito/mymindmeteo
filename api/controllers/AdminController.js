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

		//CLear the index
		ElasticService.clearAll(function allCleared(err) {
			if (err) return next(err);
			console.log('all indices cleared');

			ElasticService.indexAll(function allIndexed(err) {
				res.send(200, err);
			});
		});

	}
};

