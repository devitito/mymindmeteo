/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

module.exports.query = function(options) {
  var musts = [];
  if (_.isEmpty(options)) {
    musts = [{
      match_all: {}
    }];
  }
  else {
    _.each(options, function(value, key, list) {
      var match = {
        match: {}
      };
      match.match[key] = value;
      musts.push(match);
    });
  }

  console.log(musts);

  return {
    index: "mindmeteo",
    type: "scores",
    trackScores: false,
    body: {
      query: {
        bool: {
          must: musts
        }
      }
    }
  };
};

module.exports.parse = function(result) {
  if (result.hits.hits.length)
    return result.hits.hits[0];
  else
    return {};
};
