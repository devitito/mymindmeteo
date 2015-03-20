/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	var query = {};
	if (_.isEmpty(options)) {
		query = {
			match_all: {}
		};
	}
	else {
		query.match = {};
		query.match[options.field] = options.value;
	}

	return {
		index: "mindmeteo",
		type: "sensors",
		trackScores: false,
		//searchType: "query_and_fetch",
		size: 500,
		_source: [ "id", "label", "samples.label", "samples.id" ],
		body: {
			query: query
			}
		};
};

module.exports.parse = function(result) {
	console.log(result.hits.hits.length);
	return result.hits.hits;
};
