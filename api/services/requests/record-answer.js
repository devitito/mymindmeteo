/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

function code2range(code) {
	switch (code) {
		case 'highest':
			return {min: 3.00, max: 10};
			break;
		case 'high':
			return {min: 0.50, max: 2.99};
			break;
		case 'zero':
			return {min: -0.50, max: 0.49};
			break;
		case 'low':
			return {min: -3.00, max: -0.51};
			break;
		case 'lowest':
			return {min: -10, max: -3.01};
			break;
		default:
				break;
	}
};

module.exports.query = function(options) {
	var rangeval = code2range(options.range);
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
