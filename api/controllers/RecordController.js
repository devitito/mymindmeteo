/**
 * RecordController
 *
 * @description :: Server-side logic for managing records
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	saveBulk: function(req, res, next) {
		var records = req.param('records');
		Record.create(records)
        .then(function (scored) {
          res.send(200);
        })
		.catch(function (err) {
			console.error(err);
			res.send(500, "Sorry, our meteologist couldn't receive this new set of data. Please try again later...");
		});
	},
};
