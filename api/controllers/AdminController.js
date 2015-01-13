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
	}
};

