/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	return {
		index: 'mindmeteo',
		type: 'sensors',
		trackScores: false,
		body: {
			"aggs": {
				"sensor_by_topic": {
					"terms": {
						"field": "topic"
					}
				}
			}
		}
	};
};

module.exports.parse = function(result) {
	var res = {};

	result.aggregations.sensor_by_topic.buckets.forEach(function(entry) {
		res[entry.key] = entry.doc_count
	//	eval("res."+entry.key+" = " + entry.doc_count);
	});
	return (res);
};
