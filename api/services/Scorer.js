/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var Promise = require('bluebird');
var promise;
var queue = [];

module.exports.score = function(min, max, score) {
  var middle = (max+min)/2;
  var delta = max - middle;
  return (score*10/delta);
};

/*
module.exports.score = function(scores) {
  promise = new Promise(function (resolve, reject) {

    //Search
    ElasticService.request('score-by', {'mind.id':scores.mind.id,  tstamp: scores.tstamp})
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
      resolve();
    })
    .catch(function (error) {
      reject(error);
    });

  });
  return promise;

};
*/

/*
module.exports.isScoring = function() {
  if (promise)
    return promise.isPending();
  else
    return false;
};

module.exports.queue = function(scores) {
  queue.push(scores);
};

module.exports.unqueue = function () {
  var p = new Promise(function (resolve, reject) {
    console.log('unqueuing');

    async.each(queue,
    function(score, cb) {
      Scorer.score(score)
      .then(function(scored) {
        cb();
      })
      .catch(function(err) {
        cb(err);
      });
    },
    function(err) {
      queue = [];
      if (err)
        reject(err);
      else
        resolve();
      console.log('unqueued');
    });
  });

  return p;
};*/
