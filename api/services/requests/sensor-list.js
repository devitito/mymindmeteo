/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	var page = (options.page === undefined) ? 1 : options.page;
	var count = (options.count === undefined) ? 10 : options.count;

	return {
		index: 'mindmeteo',
		from: (page-1)*count,
		size: count,
		type: 'sensors',
		trackScores: false,
		body: {
			query: {
				match_all: {}
			},
		}
	};
};

module.exports.parse = function(result) {
	return {result: result.hits.hits, total: result.hits.total};
};
