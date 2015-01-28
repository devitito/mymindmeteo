var AdminController = require('../../api/controllers/AdminController'),
    sinon = require('sinon'),
    assert = require('assert'),
	  request = require('supertest'),
		promise = require('bluebird'),
		login = require('../helpers/login'),
		should = require('should');

describe('The Admin Controller', function () {
	describe('when index action is called', function () {

		beforeEach(function(done) {
			request(sails.hooks.http.app)
        .get('/session/destroy')
        .expect(302)
				.expect('location', '/', done);
		});

		it ('should render the view', function () {
			var view = sinon.spy();
			AdminController.index(null, {
				view: view
			});
			assert.ok(view.called);
		});

		it('should return 403 error code if called by a non admin', function(done) {
			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
				var req = request(sails.hooks.http.app).get('/admin/index');
				loginAgent.attachCookies(req);
				req.expect(403)
					 .expect('You must be an admin.', done);
			});
		});

		it('should return 403 error code if called by unknown', function(done) {
				request(sails.hooks.http.app)
				.get('/admin/index')
				.expect(403)
				.expect('You must be an admin.', done);
		});
	});

	describe('when online action is called', function () {

		beforeEach(function(done) {
			request(sails.hooks.http.app)
        .get('/session/destroy')
        .expect(302)
				.expect('location', '/', done);
		});

		it ('should return the mind datas in json, if the mind is admin role', function (done) {
			//var mind = {id: 'anid', name: 'a name'};
			/*var json = sinon.spy();
			AdminController.online({
				session: {Mind: mind}
			}, {
				json: json
			});
			assert(json.called);
			assert(json.calledWith(mind));*/

			login.admin(request(sails.hooks.http.app))
			.then(function (loginAgent) {
      	agent = loginAgent;

				var req = request(sails.hooks.http.app).get('/admin/online');
				agent.attachCookies(req);
				req.expect(200)
					.end(function(err, res) {
						if(err) return done(err);
						should(res.body).have.properties({
							'id': '2',
							'name': 'admin',
							'email': 'admin@mindmeteo.com',
							'joindate': '2015-01-12T00:00:00.000Z',
							'timezone': 'Europe/Paris',
							'locale': 'fr_FR',
							'role': 'admin'
						});
						done();
					});
    	});
		});

		it('should return 403 error code if the mind is not identified', function (done) {
			request(sails.hooks.http.app)
        .get('/admin/online')
        .expect(403)
				.expect('You must be an admin.', done);
		});

		it('should return 403 error code if the mind is not admin role', function (done) {
			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
      	agent = loginAgent;

				var req = request(sails.hooks.http.app).get('/admin/online');
				agent.attachCookies(req);
				req.expect(403)
				.expect('You must be an admin.', done);
				});
		});
	});

	describe('when resetIndices action is called', function () {

		beforeEach(function(done) {
			request(sails.hooks.http.app)
        .get('/session/destroy')
        .expect(302)
				.expect('location', '/', done);
		});

		afterEach(function () {
			// Restores mock to the original service
			sails.services.elasticservice.resetIndices.restore();
		});

		it('should return 403 error code if called by a non admin', function(done) {
			// Mocking elasticService
			var reset = sinon.stub(sails.services.elasticservice, 'resetIndices', function() {
				return new promise(function(resolve, reject){
					resolve();
				});
			});

			login.demo(request(sails.hooks.http.app))
			.then(function (loginAgent) {
				var req = request(sails.hooks.http.app).get('/admin/resetIndices');
				loginAgent.attachCookies(req);
				req.expect(403)
				.expect('You must be an admin.', done);
			});
		});

		it('should return 403 error code if called by unknown', function(done) {
			// Mocking elasticService
			var reset = sinon.stub(sails.services.elasticservice, 'resetIndices', function() {
				return new promise(function(resolve, reject){
					resolve();
				});
			});

			request(sails.hooks.http.app)
			.get('/admin/resetIndices')
			.expect(403)
			.expect('You must be an admin.', done);
		});

		it ('should call Elasticservice.resetIndices', function (done) {
			// Mocking elasticService
			var reset = sinon.stub(sails.services.elasticservice, 'resetIndices', function() {
				return new promise(function(resolve, reject){
					resolve();
				});
			});

			var send = sinon.spy();
			AdminController.resetIndices(null, {
				send: send
			});

			assert(reset.called);
			reset()
			.then(function(result) {
				assert(send.called);
				assert(send.calledWith(200));
				done();
			})
			.catch(function (err) {
				done(err);
			});
		});

		it ('should return Elasticservice.resetIndices error if it failed', function (done) {
			// Mocking elasticService
			var reset = sinon.stub(sails.services.elasticservice, 'resetIndices', function() {
				return new promise(function(resolve, reject){
					reject('a reset error');
				});
			});

			var send = sinon.spy();
			var next = sinon.spy();
			AdminController.resetIndices(null, {
				send: send
			}, next);

			assert(reset.called);
			reset()
			.then(function(result) {
				done('error should have been reported');
			})
			.catch(function (err) {
				assert(!send.called);
				assert(next.called);
				assert(next.calledWith('a reset error'));
				done();
			});
		});
	});
});
