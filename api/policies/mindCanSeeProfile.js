/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

	var sessionMindMatchesName = req.session.Mind.name === req.param('mindname');
	var isAdmin = (req.session.Mind.role == 'admin');

	// The requested name does not match the mind's name,
	// and this is not an admin
	if (!(sessionMindMatchesName || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
		req.session.flash = {
			err: noRightsError
		}
    res.redirect('/session/new');
    return;
	}

	ok();

};
