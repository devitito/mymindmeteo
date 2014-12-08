/**
* Decode filter parameter (for sensor list)
*/
module.exports = function (req, res, ok) {
	console.log(req.param('filter'));
	if (req.param('filter') !== undefined)
	{
		if ((req.param('filter') == '') || (req.param('filter') == null)) {
			//delete req.param('filter');
			req.params.filter = undefined;
			console.log('filter param deleted from request');
			console.log('params: ' + req.params());
			return ok();
		}

		var filter = decodeURIComponent(req.param('filter')).replace(' ', ' AND ');
		console.log(filter);
		req.params.filter = filter;
		console.log('new filter value : ' + filter);
		return ok();
	}
	console.log('filter not set');
	ok();
};
