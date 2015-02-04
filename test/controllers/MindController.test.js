var MindController = require('../../api/controllers/MindController'),
    sinon = require('sinon'),
    assert = require('assert'),
	  request = require('supertest'),
		promise = require('bluebird'),
		login = require('../helpers/login'),
		should = require('should');

describe('The Mind Controller', function () {
	describe('when climate action is called', function () {

		beforeEach(function(done) {
			request(sails.hooks.http.app)
        .get('/session/destroy')
        .expect(200, done);
		});

		afterEach(function () {
			// Restores mock to the original service
			sails.services.elasticservice.request.restore();
		});

		it("should return an object (and not an array)", function(done) {
			var esrequest = sinon.stub(sails.services.elasticservice, 'request');
			esrequest.withArgs('climate-chart', {id: 'demo'})
			.returns(new promise(function(resolve, reject){
					resolve({data: 'some data'});
			}));

			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
				var req = request(sails.hooks.http.app).get('/mind/climate/demo');
				loginAgent.attachCookies(req);
				req
				.expect(200)
				.end(function(err, res) {
					if(err) return done(err);
					should(res.body).be.type('object');
					done();
				});
			});
		});

		it("should return an object (and not an array) even if es request don't return an object", function(done) {
			var esrequest = sinon.stub(sails.services.elasticservice, 'request');
			esrequest.withArgs('climate-chart', {id: 'demo'})
			.returns(new promise(function(resolve, reject){
					resolve('some data');
			}));

			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
				var req = request(sails.hooks.http.app).get('/mind/climate/demo');
				loginAgent.attachCookies(req);
				req
				.expect(200)
				.end(function(err, res) {
					if(err) return done(err);
					should(res.body).be.type('object');
					done();
				});
			});
		});

		it('should return 500 error code with formated error message if an error occured', function(done) {
			// Mocking elasticService
			var esrequest = sinon.stub(sails.services.elasticservice, 'request');
			esrequest.withArgs('climate-chart', {id: 'demo'})
			.returns(new promise(function(resolve, reject){
					reject('a climate chart request error');
			}));
			/*var esrequest = sinon.stub(sails.services.elasticservice, 'request', function () {
				return new promise(function(resolve, reject){
					reject('a climate chart request error');
				});
			});*/

			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
				var req = request(sails.hooks.http.app).get('/mind/climate/demo');
				loginAgent.attachCookies(req);
				req
				.expect(500)
				.expect({error: 'a climate chart request error'})
				.end(function(err, res) {
					if(err) return done(err);
					should(res.body).be.type('object');
					done();
				});
			});
		});
	});
});
