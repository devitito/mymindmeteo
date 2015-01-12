/**
 *
 *
 */

var sinon = require('sinon'),
    assert = require('assert'),
	  request = require('supertest'),
		promise = require('bluebird'),
		rewire = require("rewire");

describe('ElasticService', function () {

	describe('ResetIndices', function() {
		var service;
		beforeEach(function () {
			//get a new instance of the service
			service = rewire("../../api/services/ElasticService");
		});

		it('should clearall and indexall', function () {
			var clearAllStub = sinon.stub().returns(promise.resolve('ok'));
			var indexAllStub = sinon.stub().returns(promise.resolve('ok'));
			service.__set__('clearAll', clearAllStub);
			service.__set__('indexAll', indexAllStub);

			var p = service.resetIndices().then(function (data) {
				assert(clearAllStub.called);
				assert(indexAllStub.called);
				assert(clearAllStub.calledBefore(indexAllStub));
				assert(data, 'ok');
			});
			return p;
		});

		it('should report clearall error', function() {
			var clearAllStub = sinon.stub().returns(promise.reject('clearall error'));
			var indexAllStub = sinon.stub().returns(promise.resolve('ok'));
			service.__set__('clearAll', clearAllStub);
			service.__set__('indexAll', indexAllStub);

			var p = service.resetIndices().catch(function (err) {
				assert(clearAllStub.called);
				assert(!indexAllStub.called);
				assert(err, 'clearall error');
			});
			return p;
		});

		it('should report indexall error', function() {
			var clearAllStub = sinon.stub().returns(promise.resolve('ok'));
			var indexAllStub = sinon.stub().returns(promise.reject('indexall error'));
			service.__set__('clearAll', clearAllStub);
			service.__set__('indexAll', indexAllStub);

			var p = service.resetIndices().catch(function (err) {
				assert(clearAllStub.called);
				assert(indexAllStub.called);
				assert(err, 'indexall error');
			});
			return p;
		});
	});
});
