var AdminController = require('../../api/controllers/AdminController'),
    sinon = require('sinon'),
    assert = require('assert'),
	  request = require('supertest'),
		promise = require('bluebird');

describe('The Admin Controller', function () {
	describe('when index action is called', function () {
		it ('should render the view', function () {
			var view = sinon.spy();
			AdminController.index(null, {
				view: view
			});
			assert.ok(view.called);
		});
	});

	describe('when online action is called', function () {
		it ('should return the mind of the current session in json', function () {
			var mind = {id: 'anid', name: 'a name'};
			var json = sinon.spy();
			AdminController.online({
				session: {Mind: mind}
			}, {
				json: json
			});
			assert(json.called);
			assert(json.calledWith(mind));
		});

		it ('should return 404 if there is no active mind in session', function () {
			var send = sinon.spy();
			AdminController.online({
				session: {}
			}, {
				send: send
			});
			assert(send.called);
			assert(send.calledWith(404));
		});
	});

	describe('when recreate-index action is called', function () {

		afterEach(function () {
			// Restores mock to the original service
			sails.services.elasticservice.resetIndices.restore();
		//	sails.services.elasticservice.indexAll.restore();
		})

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
