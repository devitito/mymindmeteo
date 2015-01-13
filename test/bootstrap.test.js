var Sails = require('sails'), sails;

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'info'
    },
    models: {
      connection: 'mindMeteoDb',
      migrate: 'alter'
    },
		crsf : false
  }, function(err, server) {
		sails = server;
    if (err)
      return done(err);

  /*  // Load fixtures
    var barrels = new Barrels();

    // Save original objects in `fixtures` variable
    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(function(err) {
      done(err, sails);
    });*/
		
		done(err, sails);
  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
