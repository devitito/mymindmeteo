/**
 * MindController
 *
 * @description :: Server-side logic for managing minds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	create: function(req, res, next) {
		var adminCreate = function (req, res, next) {
			//marshalize parameters (if input added through inspect element > edit in html > paste html input with role = admin)
			var mindObj = {
				name: req.param('name'),
				email: req.param('email'),
				password: req.param('password'),
				role: req.param('role'),
				locale: req.param('locale'),
				timezone: req.param('timezone')
			};

			//todo check password and confirm password

			Mind.create(mindObj, function mindCreated(err, mind) {
				if (err) return next(err);
				res.json(mind);
			});
		};

		var guestCreate = function (req, res, next) {
			//marshalize parameters (if input added through inspect element > edit in html > paste html input with role = admin)
			var mindObj = {
				name: req.param('name'),
				email: req.param('email'),
				password: req.param('password')
			};

			// Create a mind with the params sent from
			// the sign-up form --> new.ejs
			Mind.create(mindObj, function mindCreated(err, mind) {

				// If there's an error
				if (err) {
					return res.send(500, err);
				}

				// Log mind in
				req.session.authenticated = true;
				req.session.Mind = mind;

				res.send(200, mind);
			});
		};

		if (req.session.Mind && req.session.Mind.role == 'admin')
			return adminCreate(req, res, next);
		else
			return guestCreate(req, res, next);
	},

	 update: function(req, res, next) {
		 var mindObj = {
			 email: req.param('email'),
			 role: req.param('role'),
			 locale: req.param('locale'),
			 timezone: req.param('timezone')
		}

    Mind.update(req.param('id'), mindObj, function mindUpdated(err, minds) {
      if (err) res.json(err);

			//update current session if needed
			if (req.param('id') == req.session.Mind.id)
				req.session.Mind = minds[0];

      res.json(minds[0]);
    });
  },

	/*dashboard: function(req, res, next) {
		res.view();
	},*/

	'validate-name': function(req, res, next) {
		Mind.findOneByName(req.param('name'), function(err, mind) {
			if (err) return next(err);

			// If no mind is found...
			if (!mind)
				res.json({valid: true});
			else
				res.json({valid: false});
		});
	},

	'validate-email': function(req, res, next) {
		Mind.findOneByEmail(req.param('email'), function(err, mind) {
			if (err) return next(err);

			// If no mind is found...
			if (!mind)
				res.json({valid: true});
			else
				res.json({valid: false});
		});
	},

	'climate': function(req, res, next) {

		ElasticService.request('climate-chart', {id: req.param('id')})
		.then(function (climate) {
			res.send(climate);
		}).catch(function (err) {
			res.json(500, {error: err});
		});
	}
};

