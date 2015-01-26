/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	return {
		index: 'mindmeteo',
		type: 'records',
		trackScores: false,
		body: {
			"aggs": {
				"records_by_hour": {
					"terms": {
						"field": "hour",
						"order" : { "_term" : "asc" }
      		}
    		},
			}
		}
	};
};

module.exports.parse = function(result) {
	var res = {};

	result.aggregations.records_by_hour.buckets.forEach(function(entry) {
		res[entry.key] = entry.doc_count;
	});
	return res;
};
