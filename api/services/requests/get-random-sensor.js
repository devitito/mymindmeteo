/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports.query = function(options) {
		return {
			index: 'mindmeteo',
			type: 'sensors',
			body: {
				/*query: {
					filtered: {
						query: {
							fuzzy: {
								"id": {
									value: randomIntFromInterval(1, options.count),
									fuzziness : 10
								}
							}
						},
						filter: {
							term: { "status": "approved"}
						}
					}
				}*/
				query: {
					match: {
						id: randomIntFromInterval(1, options.count)
					}
				}
			}
		};
};

module.exports.parse = function(result) {
	if (result.error) return {};
	return result.hits.hits[0]._source;
};
