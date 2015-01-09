var AdminController = require('../../api/controllers/AdminController'),
    sinon = require('sinon'),
    assert = require('assert'),
	  request = require('supertest');

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
		it ('should call Elasticservice clearAll and indexAll', function () {
			// Mocking elasticService
			var clearall = sinon.stub(sails.services.elasticservice, 'clearAll', function(cb) {
				cb(null);
			});
			var indexall = sinon.stub(sails.services.elasticservice, 'indexAll', function(cb) {
				cb(null);
			});
			var send = sinon.spy();

			AdminController.resetIndices(null, {
				send: send
			});

			assert(clearall.called);
			assert(indexall.called);
			assert(sails.services.elasticservice.clearAll.calledBefore(sails.services.elasticservice.indexAll));

			assert(send.called);
			assert(send.calledWith(200));

			// Restores mock to the original service
  		sails.services.elasticservice.clearAll.restore();
			sails.services.elasticservice.indexAll.restore();
		});

		it ('should return Elasticservice.clearAll error if it failed', function () {
			// Mocking elasticService
			var clearall = sinon.stub(sails.services.elasticservice, 'clearAll', function(cb) {
				cb('a clearAll error');
			});
			var indexall = sinon.stub(sails.services.elasticservice, 'indexAll', function(cb) {
				cb(null);
			});
			var send = sinon.spy();
			var next = sinon.spy();

			AdminController.resetIndices(null, {
				send: send
			}, next);

			assert(clearall.called);
			assert(!indexall.called);
			assert(!send.called);

			assert(next.called);
			assert(next.calledWith('a clearAll error'));

			// Restores mock to the original service
  		sails.services.elasticservice.clearAll.restore();
			sails.services.elasticservice.indexAll.restore();
		});

		it ('should return Elasticservice.indexAll error if it failed', function () {
			// Mocking elasticService
			var clearall = sinon.stub(sails.services.elasticservice, 'clearAll', function(cb) {
				cb(null);
			});
			var indexall = sinon.stub(sails.services.elasticservice, 'indexAll', function(cb) {
				cb('a indexAll error');
			});
			var send = sinon.spy();
			var next = sinon.spy();

			AdminController.resetIndices(null, {
				send: send
			}, next);

			assert(clearall.called);
			assert(indexall.called);
			assert(!send.called);

			assert(next.called);
			assert(next.calledWith('a indexAll error'));

			// Restores mock to the original service
  		sails.services.elasticservice.clearAll.restore();
			sails.services.elasticservice.indexAll.restore();
		});

	});
});
