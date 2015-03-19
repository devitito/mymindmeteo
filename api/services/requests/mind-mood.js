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

	var ranges = [
		{code:'highest', name:'Highest', value:{min: 5.00, max: 10}},
		{code:'high', name:'High', value:{min: 2.50, max: 4.99}},
		{code:'zero', name:'Neither high nor low', value:{min: -2.50, max: 2.49}},
		{code:'low', name:'Low', value:{min: -5.00, max: -2.51}},
		{code:'lowest', name:'Lowest', value:{min: -10, max: -5.01}}
	];

	for (var i = 0; i < ranges.length; i++) {
		if ((mood >= ranges[i].value.min) && (mood <= ranges[i].value.max)) {
			return ranges[i].code;
		}
	}
};
