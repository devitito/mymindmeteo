/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	'new': function (req, res) {
		res.view();
	},

    create: function(req, res, next) {

		// Check for email and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('nameoremail') || !req.param('password')) {

			var usernamePasswordRequiredError = [{
				name: 'usernamePasswordRequired',
				message: 'You must enter both a name or email and password.'
			}]

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/session/new');
			return;
		}

		//@todo nameoremail
    //    var nameoremail = req.param('nameoremail');
    //    if (nameoremail.search('@') == -1)

		// Try to find the user by there email address.
		// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
		// Mind.findOneByEmail(req.param('email')).done(function(err, user) {
		Mind.findOneByName(req.param('nameoremail'), function foundMind(err, mind) {
			if (err) return next(err);

			// If no mind is found...
			if (!mind) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The mind ' + req.param('nameoremail') + ' is not found.'
				}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), mind.password, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid mind and password combination.'
					}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.Mind = mind;

				if (mind.role == 'admin')
						res.redirect('/administrator/');
				else
						res.redirect('/' + mind.name);
        });
		});
	},

	destroy: function(req, res, next) {
		// Wipe out the session (log out)
		req.session.destroy();
		// Redirect the browser to the landing page
		res.redirect('/');
	}
};

