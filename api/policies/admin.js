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
		var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin.'}]
		req.session.flash = {
			err: requireAdminError
		}
		res.redirect('/session/new');
		return;
	}
};
