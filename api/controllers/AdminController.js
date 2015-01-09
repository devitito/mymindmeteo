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
		if (req.session.Mind == undefined) return res.send(404);
		res.json(req.session.Mind);
	},

	'resetIndices': function(req, res, next) {
		//CLear the index
		ElasticService.clearAll()
		.then(function (result) {
			return ElasticService.indexAll();
		})
		.then(function (result) {
			res.send(200);
		})
		.catch(function (err) {
			next(err);
		});
	}
};

