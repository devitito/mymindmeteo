/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	var rangeval = ReportRanges.code2range(options.range);
	return {
		index: 'mindmeteo',
		type: 'records',
		body: {
			"sort": [
				{
					"tstamp": {
						"order": "desc"
					}
				}
			],
			"query": {
				"bool": {
					"must": [
						{
							"match": {
								"topic": options.topic
							}
						},
						{
							"range": {
								"value": {
									"gte": rangeval.min,
									"lte": rangeval.max
								}
							}
						},
						{
							"match": {
								"mind.id": options.id
							}
						}
					]
				}
			}
		}
	};
};

module.exports.parse = function(result) {
	var hits = result.hits.hits;
	try {
		/*hits.forEach(function(hit) {
			console.log(hit._source.sample.report_format);
		});*/
		return {
			en: hits[0]._source.sample.report_format,
			fr: '',
			es: ''
		};
	} catch (e) {
		return {
			en: 'censored for technical reasons',
			fr: 'censuré pour des raisons techniques',
			es: ''
		};
	}
};
