/**
 * MindController
 *
 * @description :: Server-side logic for managing minds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res) {
		res.view();
	},
	
	create: function(req, res, next) {

		//marshalize parameters (if input added through inspect element > edit in html > paste html input with role = admin)
		var mindObj = {
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password')
		}

		// Create a mind with the params sent from
		// the sign-up form --> new.ejs
		Mind.create(mindObj, function mindCreated(err, mind) {

			// If there's an error
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err.ValidationError
				}

				// If error redirect back to sign-up page
				return res.redirect('/mind/new');
			}

			// Log mind in
			req.session.authenticated = true;
			req.session.Mind = mind;

                /*
								// Change status to online
              user.online = true;
              user.save(function(err, user) {
                if (err) return next(err);

              // add the action attribute to the user object for the flash message.
              user.action = " signed-up and logged-in."

              // Let other subscribed sockets know that the user was created.
              User.publishCreate(user);

            */

			res.redirect('/' + mind.name);
		});
	},

	index: function(req, res, next) {
		res.view();
	}
};

