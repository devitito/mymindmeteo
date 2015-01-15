var superagent = require('superagent');
var promise = require('bluebird');
var agent = superagent.agent();
var admin = {
  "nameoremail": "admin",
  "password": "adminadmin"
};
var demo = {
  "nameoremail": "demo",
  "password": "demodemo"
};

exports.admin = function (request, done) {
  var deferred = promise.defer();
	admin._csrf = testCsrfToken;
	request
		.post('/session/create')
		.send(admin)
		.expect(302)
		.end(function (err, res) {
		if (err) {
			deferred.reject(err);
			throw err;
		}
		console.log('logged in as admin.');
		// Set cookie for the agent (browsers do this automatically)
		agent.saveCookies(res);
		deferred.resolve(agent);
		if (done != undefined) done(agent);
	});
	return deferred.promise;
};

exports.demo = function (request, done) {
  var deferred = promise.defer();
	demo._csrf = testCsrfToken;
	request
    .post('/session/create')
		//.set('X-CSRF-Token', testCsrfToken)
    .send(demo)
    .end(function (err, res) {
      if (err) {
				deferred.reject(err);
        throw err;
      }
			console.log('logged in as demo.');
      agent.saveCookies(res);
			deferred.resolve(agent);
      if (done != undefined) done(agent);
    });
	return deferred.promise;
};
