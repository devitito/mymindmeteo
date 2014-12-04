/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var elasticsearch = require('elasticsearch');
var async = require('async');
var client;
var indexableTable = [{model: 'Sensor', table:'sensors'}, {model: 'Record', table:'records'}];

/**
 * Index all records of a table in Elasticsearch
 */
var indexTable = function(indexableTable, next) {
	var errors = [];
	var recordIndexed = 0;

	//todo check if model and table exist

	eval(indexableTable.model).find({}, function(err, records) {
		if (err) return next(err);

		for(var i = 0, len = records.length; i < len; i++) {
			console.log(records[i].label);
			eval(indexableTable.model).toIndexable(records[i], function (err, indexable) {
				if (err) {
					errors.push(err);
					recordIndexed++;
					if (recordIndexed == records.length) next(errors);
				}
				else module.exports.index(indexableTable.table, indexable, function documentIndexed(err, res) {
					if (err) errors.push(err);

					console.log(res);
					recordIndexed++;
					if (recordIndexed == records.length) next(errors);
				});
			});
		}
	});
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
			next();
		});
	});
}

/*
* Index a document with the given type
*/
module.exports.index = function (type, document, next) {
	client.index({index: 'mindmeteo', type: type, body: document}, function documentIndexed(err, res, status) {
		if (err) return next(err);
		next(err, res);
	});
};

/**
 * Export all indexable tables into Elasticsearch
 */
module.exports.indexAll = function(next) {
	var errors = [];

	async.each(indexableTable, indexTable, function(err) {
		errors.concat(err);
		next(errors);
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
/*	delete: function(type, document, next) {
		next();
	},*/

	/**
	* Issue a request
	*/
/*	request: function(request, options, next) {
		next();
	}*/
