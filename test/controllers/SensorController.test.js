/**
 *
 */

var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    promise = require('bluebird'),
    login = require('../helpers/login'),
    should = require('should');

describe('The Sensor Controller', function () {
  describe('when find action is called', function () {

    beforeEach(function(done) {
      request(sails.hooks.http.app)
        .get('/session/destroy')
        .expect(200, done);
    });

    it("should return the sensor as JSON with all attributes except records", function(done) {
      login.admin(request(sails.hooks.http.app))
        .then(function (loginAgent) {
        var req = request(sails.hooks.http.app).get('/sensor/1');
        loginAgent.attachCookies(req);
        req
          .expect(200)
          .end(function(err, res) {
          if(err) return done(err);
          should(res.body).be.type('object');
          (res.body).should.have.properties('samples');
          (res.body).should.not.have.properties('records');
          done();
        });
      });
    });
  });
});
