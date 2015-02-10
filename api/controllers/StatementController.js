/**
 * StatementController
 *
 * @description :: Server-side logic for managing statements
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	bymind : function(req, res, next) {
		Statement.find({mind: req.param('id')}).populate('report')
		.then(function(statements) {
			var reports = _.map(statements, function(statement) {
				return statement.report;
			});
			var meteologists = Mind.findById(_.pluck(reports, 'meteologist'))
			.then(function (meteologists) {
				return meteologists;
			});
			return [statements, meteologists];
			//res.send(statements);
		})
		.spread(function(statements, meteologists) {
			var meteologists = _.indexBy(meteologists, 'id');
			statements = _.map(statements, function(statement) {
				statement.report.meteologist = {id: meteologists[statement.report.meteologist].id, name: meteologists[statement.report.meteologist].name} ;
				return statement;
			});
			res.send(statements);
		})
		.catch(function(err) {
			res.send(500, [err]);
		});
	},

	generate: function(req, res, next) {
		StatementGenerator.generate(req.param(('id')))
		.then(function(statement) {
			res.send(statement);
		})
		.catch(function(err) {
			res.json(500, {error: err});
		});
	},
};

