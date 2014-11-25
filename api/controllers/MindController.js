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
	    // Create a mind with the params sent from 
	    // the sign-up form --> new.ejs
	    Mind.create(req.params.all(), function mindCreated(err, mind) {

	      // If there's an error
	      if (err) {
	        console.log(err);
	        req.session.flash = {
	          err: err
	        }

	        // If error redirect back to sign-up page
	        return res.redirect('/mind/new');
	      }

	      res.json(mind);
	      // Log user in
	     /* req.session.authenticated = true;
	      req.session.User = user;

	      // Change status to online
	      user.online = true;
	      user.save(function(err, user) {
	        if (err) return next(err);

	      // add the action attribute to the user object for the flash message.
	      user.action = " signed-up and logged-in."

	      // Let other subscribed sockets know that the user was created.
	      User.publishCreate(user);

	        // After successfully creating the user
	        // redirect to the show action
	        // From ep1-6: //res.json(user); 

	        res.redirect('/user/show/' + user.id);
	      });*/
	    });
	  },
};

