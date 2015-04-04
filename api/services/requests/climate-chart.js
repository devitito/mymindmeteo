/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

function round(value) {
	if (value == undefined)
		return value;
	else
		return value.toFixed(2);
};

module.exports.query = function(options) {
  return {
    index: 'mindmeteo',
    type: 'records',
    trackScores: false,
    size: 30,
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
	var res = {
		info: {},
		data: []
	};
	var sunny = 0
	var rainy = 0;

	result.aggregations.meteo_over_time.buckets.forEach(function(entry) {
		var tab = {};
		var avg = 0;
		entry.meteo.buckets.forEach(function (meteo) {
			tab[meteo.key] =  meteo.avg_value.value;
			avg += meteo.avg_value.value;
		});
		tab.mood = avg/entry.meteo.buckets.length;

		if (tab.mood >= 0) sunny++;
		else rainy++;

		res.data.push({
			"date": entry.key_as_string,
			"love": round(tab.love),
			"money": round(tab.money),
			"health": round(tab.health),
			"mood": round(tab.mood)
		});
	});


	res.info = {"total": result.hits.total, "sunny": sunny, "rainy": rainy};
	return res;
};
