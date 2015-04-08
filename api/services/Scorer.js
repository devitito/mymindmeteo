/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var promise = require('bluebird');

module.exports.score = function(scores) {
  var deferred = promise.defer();

  //Search
  ElasticService.request('score-by', {'mind.id':scores.mind.id, /*date: scores.date*/ tstamp: scores.tstamp})
  .then(function(previous) {
    if (!_.isEmpty(previous)) {
      scores.love.max += previous._source.love.max;
      scores.health.max += previous._source.health.max;
      scores.money.max += previous._source.money.max;
      scores.love.min += previous._source.love.min;
      scores.health.min += previous._source.health.min;
      scores.money.min += previous._source.money.min;
      scores.love.score += previous._source.love.score;
      scores.health.score += previous._source.health.score;
      scores.money.score += previous._source.money.score;
      return ElasticService.update('scores', {id: previous._id}, scores);
    }
    //index
    return ElasticService.index('scores', scores);
  })
  .then(function(indexed) {
   deferred.resolve();
  })
  .catch(function (error) {
    deferred.reject(error);
  });

  return deferred.promise
};
