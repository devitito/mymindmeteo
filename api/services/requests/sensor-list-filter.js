/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
	var page = (options.page === undefined) ? 1 : options.page;
	var count = (options.count === undefined) ? 10 : options.count;
	var filter = (options.filter === undefined) ? '' : options.filter;

	return {
			index: 'mindmeteo',
			type: 'sensors',
			from: (page-1)*count,
			size: count,
			trackScores: false,
			body: {
				query: {
					bool: {
						should: [
							{
								multi_match: {
									query: filter,
									fields: [
										"label",
										"meteologist",
										"topic",
										"status"
									]
								}
							},
							{
								nested: {
									path: "samples",
									query: {
										match: {
											'samples.label': filter
										}
									}
								}
							}
						]
					}
				}
			}
};
};

module.exports.parse = function(result) {
	return {result: result.hits.hits, total: result.hits.total};
};
