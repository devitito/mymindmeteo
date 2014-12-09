/**
 * Decode filter query parameter
 * Replace spaces by ' AND '
 * Delete filter query param if == ''
 */

module.exports = function(req, res, ok) {
	var queryFilter = req.query.filter;
	if (queryFilter !== undefined) {
		if (queryFilter == '') {
			//Delete filter parameter
			req.query.filter = undefined;
			return ok();
		}

		//Replace ' ' by ' AND '
		req.query.filter = decodeURIComponent(queryFilter).replace(' ', ' AND ');
	}
	ok();
};
