/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('nameoremail') || !req.param('password')) {
			res.send(403, "You must enter both a name or email and password.");
			return;
		}

		var foundMind = function(err, mind) {
			if (err) return next(err);

			// If no mind is found...
			if (!mind) {
				res.send(403, 'The mind ' + req.param('nameoremail') + ' is not found.');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), mind.password, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					res.send(403, 'Invalid mind and password combination.');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.Mind = mind;

				res.send(mind);
        });
		};

    var nameoremail = req.param('nameoremail');
    if (nameoremail.search('@') == -1)
			Mind.findOneByName(req.param('nameoremail'), foundMind);
		else
			// Try to find the user by there email address.
			// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
			Mind.findOneByEmail(req.param('nameoremail'), foundMind);
	},

	destroy: function(req, res, next) {
		// Wipe out the session (log out)
		req.session.destroy();
		// Redirect the browser to the landing page
		res.redirect('/');
	}
};

