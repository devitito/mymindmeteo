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
	request
    .post('/session/create')
    .send(admin)
    .end(function (err, res) {
      if (err) {
				console.log(err);
				deferred.reject(err);
        throw err;
      }
      agent.saveCookies(res);
			deferred.resolve(agent);
      if (done != undefined) done(agent);
    });
	return deferred.promise;
};

exports.demo = function (request, done) {
  var deferred = promise.defer();
	request
    .post('/session/create')
    .send(demo)
    .end(function (err, res) {
      if (err) {
				deferred.reject(err);
        throw err;
      }
      agent.saveCookies(res);
			deferred.resolve(agent);
      if (done != undefined) done(agent);
    });
	return deferred.promise;
};
