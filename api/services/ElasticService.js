/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var elasticsearch = require('elasticsearch');
var async = require('async');
var promise = require('bluebird');
var client;
var indexableTable = [{model: 'Record', table:'records'}, {model: 'Sensor', table:'sensors'} ];

/**
 * Delete mindmeteo index and recreate it with mappings
 */
var clearAll = function() {
	var deferred = promise.defer();
	client.indices.delete({index: 'mindmeteo', refresh: true})
	.then(function (res) {
		module.exports.connect()
		.then(function (res) {
			deferred.resolve(res);
		})
		.catch(function (err) {
			deferred.reject(err);
		});
	})
	.catch(function (err) {
		deferred.reject(err);
	});
	return deferred.promise;
};

/**
 * Export all indexable tables into Elasticsearch
 */
var indexAll = function() {
	var deferred = promise.defer();
	var domain = require('domain');
	var d = domain.create();
	// Domain emits 'error' when it's given an unhandled error
	d.on('error', function(err) {
		var error = new Error();
		error.message = err.message;
		deferred.reject(error);
	});

	d.run(function() {
		async.concat(indexableTable, indexTable, function(err, res) {
			if (!_.isEmpty(err)) {
				var error = new Error();
				error.message = err;
				return deferred.reject(error);
			}
			deferred.resolve(res);
		});
	});
	return deferred.promise;
};

/**
 * Index all records of a table in Elasticsearch
 */
var indexTable = function(indexableTable, next) {
	var errors = [];
	var recordIndexed = 0;

	try {
		eval(indexableTable.model).find({}, function(err, records) {
			if (err) return next(err);

			async.each(records,
				function(record, cb) {
					eval(indexableTable.model).toIndexable(record, function (err, indexable) {
						if (err) {
							errors.push(err.message);
							cb();
						}
						else module.exports.index(indexableTable.table, indexable, function documentIndexed(err, res) {
							if (err)
							{
								console.error(err.message);
								return cb(err);
								//errors.push(err.message);
							}
							cb();
						});
					});
				},
				function(err) {
					next(err, errors)
			});
		});
	} catch (e) {
		errors.push(e.message);
		next(null, errors);
	};
};

/**
 * Reset and recreate all indices
 *
 */
module.exports.resetIndices = function () {
	return clearAll()
	.then(function (result) {
		return indexAll();
	});
};

/**
 * Call during bootstrap and after all index cleared
 */
module.exports.connect = function() {
	var deferred = promise.defer();
	if (client === undefined) {
		client = elasticsearch.Client({
			host: 'http://localhost:9200'
		});
	}

	client.indices.exists({index: 'mindmeteo'}, function indexExists(err, res, status) {
		if (err) return deferred.reject(err);

		//index don't exist
		if (!res) client.indices.create({index: 'mindmeteo'}, function indexCreated(err, res, status) {
			if (err) return deferred.reject(err);

			async.parallel( {
				sensors: function (cb) {
					client.indices.putMapping({
						index: 'mindmeteo',
						type: 'sensors',
						body: {
								properties: {
									'id' : {type: 'integer', include_in_all: false},
									'topic' : {type : 'string', include_in_all: true},
									'label': {type: 'string', include_in_all: true},
									'tstamp': {type: 'date', "format" : "yyyy-MM-dd HH:mm:ss", include_in_all : true},
									'meteologist' : {type : 'string', include_in_all : true},
									'samples' : {
										'type' : 'nested',
										'properties' : {
											'id' : {type : 'string', include_in_all : true},
											'label' : {type : 'string', include_in_all : true},
											'value' : {type : 'integer', include_in_all : true},
											'report_format': {type : 'string', include_in_all : true},
										}
									}
								}
						}
					}).then(function (mappingRes) {
						cb(null, mappingRes);
					}).catch(function (err) {
						cb(err);
					});
				},
				records: function (cb) {
					client.indices.putMapping({
						index: 'mindmeteo',
						type: 'records',
						body: {
								properties: {
									'id' : {type: 'string', include_in_all: false},
									'topic' : {type : 'string', include_in_all: true},
									'sample': {
										'type' : 'object',
										'properties' : {
											'label' : {type : 'string', include_in_all: true},
											'report_format' : {type : 'string', include_in_all: true},
										}
									},
									'value': {type : 'integer', include_in_all: true},
									'tstamp': {type: 'date', "format" : "yyyy-MM-dd HH:mm:ss", include_in_all : true},
									'day': {type : 'integer', include_in_all: true},
									'hour': {type : 'integer', include_in_all: true},
									'timezone': {type : 'string', include_in_all: true},
									'mind': {
										'type' : 'object',
										'properties' : {
											'name' : {type : 'string', include_in_all : true},
											'id' : {type : 'string', include_in_all : true},
											'email' : {type : 'string', include_in_all : true},
											'joindate' : {type: 'date', "format" : "yyyy-MM-dd HH:mm:ss", include_in_all : true}
										}
									},
									'sensor' : {
										'type' : 'object',
										'properties' : {
											'label' : {type : 'string', include_in_all : true},
											'meteologist' : {type : 'string', include_in_all : true},
										}
									}
								}
						}
					}).then(function (mappingRes) {
						cb(null, mappingRes);
					}).catch(function (err) {
						cb(err);
					});
				}
			},
			function (err, results) {
				if (err) return deferred.reject(err);
				else deferred.resolve(results);
			});
		});
		else
			deferred.resolve(res);
	});
	return deferred.promise;
}

/*
* Index a document with the given type
*/
module.exports.index = function (type, document, next) {
  var deferred = promise.defer();
  client.index({index: 'mindmeteo', type: type, id: document.id, refresh: true, body: document}, function documentIndexed(err, res, status) {
    if (err)
    {
      deferred.reject(err);
      if (next) return next(err);
    }
    deferred.resolve(res);
    if (next) next(err, res);
    //next(err, res);
  });
  return deferred.promise;
};

/*
	* map a type in the index
	*/
	/*map: function(type, mapping, next) {
		next();
	},*/

	/*
	* Delete the document of a given type
	*/
	module.exports.delete = function(type, id, next) {
		client.delete({index: 'mindmeteo', type: type, id: id, refresh: true}, function documentDeleted(err, res) {
			if (err) return next(err);
			next(err, res);
		});
	},

	/**
	* Issue a request
	*/
module.exports.request = function(request, options, next) {
	var deferred = promise.defer();
	var adapter = require('./requests/'+request+'.js');

	client.search(adapter.query(options), function (err, res) {
		if (err)
		{
			deferred.reject(err);
			if (next) return next(err);
		}
		deferred.resolve(adapter.parse(res));
		if (next) next(null, adapter.parse(res));
	});
	return deferred.promise;
};
