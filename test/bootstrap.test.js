var Sails = require('sails'), sails;
var request = require('supertest');
var Barrels = require('barrels');
var Promise = require('bluebird');

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'info'
    },
    models: {
      connection: 'mindMeteoDbTest',
      migrate: 'alter'
    },
    csrf : false
  }, function(err, server) {
    sails = server;
    if (err)
      return done(err);

   /* dbFixture()
    .then(function() {*/
      // CSRF getter
      if (sails.config.csrf == true)
        getTestCsrfToken(function(err, csrf){
          done(err, sails);
        });
      else done(null, sails);
   /* })
    .catch(function(err) {
      done(err, sails);
    });*/
  });
});

dbFixture = function () {
  return new Promise(function(resolve, reject) {
    // Load fixtures
    var barrels = new Barrels();

    // Save original objects in `fixtures` variable
    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(['mind'], function(err) {
      if (err) return reject(err);

      barrels.populate(['sample'], function(err) {
        if (err) return reject(err);

        barrels.populate(['sensor'], function(err) {
          console.log(err);
          if (err) reject(err);
          else resolve();
        }, false);
      }, false);
    }, false);


  });
};


testCsrfToken = null;

getTestCsrfToken = function (cb) {
	if(testCsrfToken) {
		cb(null, testCsrfToken);
	} else {
	request(sails.hooks.http.app)
	.get('/csrfToken')
	.end(function (err, res) {
		var csrf;
		if(res.body._csrf) {
			csrf = res.body._csrf;
			testCsrfToken = res.body._csrf;
		} else {
			err = new Error ('cant get csrf token');
		}
		// TODO implement response data check
		//res.body.users.should.be.an.instanceOf(Array);
		cb(err, csrf);
		});
	}
};

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
