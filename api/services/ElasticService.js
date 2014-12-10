/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var elasticsearch = require('elasticsearch');
var async = require('async');
var client;
var indexableTable = [{model: 'Record', table:'records'}, {model: 'Sensor', table:'sensors'} ];

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
							if (err) errors.push(err.message);
							cb();
						});
					});
				},
				function(err) {
					next(errors)
			});
		});
	} catch (e) {
		errors.push(e.message);
		next(null, errors);
	};
};

/**
 * Delete mindmeteo index and recreate it with mappings
 */
module.exports.clearAll = function(next) {
		client.indices.delete({index: 'mindmeteo'}, function indicesDeleted(err, res) {
			if (err) return next(err);
			module.exports.connect(next);
		});
};

/**
 * Call during bootstrap and after all index cleared
 */
module.exports.connect = function(next) {

	if (client === undefined) {
		client = elasticsearch.Client({
			host: 'http://localhost:9200'
		});
	}

	client.indices.exists({index: 'mindmeteo'}, function indexExists(err, res, status) {
		if (err) return next(err);

		//index don't exist
		if (!res) client.indices.create({index: 'mindmeteo'}, function indexCreated(err, res, status) {
			if (err) return next(err);

			//add types and mappings
			client.indices.putMapping({
				index: 'mindmeteo',
				type: 'sensors',
				body: {
			//		sensor: {
						properties: {
							'id' : {type: 'string', include_in_all: false},
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
								}
							}
						}
			//		}
				}
			}, function (err, mappingRes) {
				if (err) return next(err);
				next();
			});

		});
		else
			next();
	});

}

/*
* Index a document with the given type
*/
module.exports.index = function (type, document, next) {
	client.index({index: 'mindmeteo', type: type, id: document.id, refresh: true, body: document}, function documentIndexed(err, res, status) {
		if (err) return next(err);
		next(err, res);
	});
};

/**
 * Export all indexable tables into Elasticsearch
 */
module.exports.indexAll = function(next) {
	async.concat(indexableTable, indexTable, function(err, res) {
		if (!_.isEmpty(res)) {
			var error = new Error();
			error.message = res.toString();
			return next(error);
		}
		next();
	});
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
	var adapter = require('./requests/'+request+'.js');

	client.search(adapter.query(options), function (err, res) {
		if (err) return next(err);
		next(null, adapter.parse(res));
	});
};
