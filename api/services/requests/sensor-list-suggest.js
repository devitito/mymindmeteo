/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	var filter = (options.filter === undefined) ? '' : options.filter;

	return {
		index: 'mindmeteo',
		type: 'sensors',
		trackScores: false,
		body: {
			query: {
				fuzzy_like_this: {
					like_text: filter,
					fields: ['label', 'meteologist', 'topic', 'status', 'samples.label']
				}
			}
		},
	};
};

module.exports.parse = function(result) {
	return result.hits.hits;
};
