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
			query: {
				match: {
					"mind.name": options.id
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
	var res = [];

	result.aggregations.meteo_over_time.buckets.forEach(function(entry) {
		var tab = {};
		var avg = 0;
		entry.meteo.buckets.forEach(function (meteo) {
			tab[meteo.key] =  meteo.avg_value.value;
			avg += meteo.avg_value.value;
		});
		tab.mood = avg/entry.meteo.buckets.length;
		res.push({"date": entry.key_as_string, "love": tab.love, "money": tab.money, "health": tab.health, "mood": tab.mood});
	});

	return res;
};
