/**
* Allow any authenticated user.
*/
module.exports = function (req, res, ok) {
	// User is allowed, proceed to controller
	if (req.session.Mind && (req.session.Mind.role == 'admin')) {
		return ok();
	}
	// User is not allowed
	else {
		res.send(403, 'You must be an admin.');
		return;
	}
};
