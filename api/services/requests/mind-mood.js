/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var moment = require('moment');

module.exports.query = function(options) {
	return {
		index: 'mindmeteo',
		type: 'records',
		trackScores: false,
		body: {
			query: {
				filtered: {
					query: {
        		match: {
							"mind.id": options.id
						}
					},
					filter: {
						range: {
							tstamp: {
								gte: moment.utc().format('YYYY-MM-DD 00:00:00')
							}
						}
					}
				}
			},
			aggs: {
				meteo_over_time: {
					date_histogram: {
						field: "tstamp",
						interval: "day",
						format: "yyyy-MM-dd"
					},
					aggs: {
						meteo: {
							terms: {
								field: "topic"
							},
							aggs: {
								avg_value: {
									avg: {
										field: "value"
									}
								}
							}
						}
					}
				}
			}
		}
	};
};

module.exports.parse = function(result) {
	var mood;
	result.aggregations.meteo_over_time.buckets.forEach(function(entry) {
		var avg = 0;
		entry.meteo.buckets.forEach(function (meteo) {
			avg += meteo.avg_value.value;
		});
		mood = avg/entry.meteo.buckets.length;
	});

	return ReportRanges.value2code(mood);
};
