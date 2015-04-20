/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */
var assert = require('assert');

describe('Scorer Service', function () {

  describe('score() function', function() {
    it('should calculate the score correctly', function(done) {
      assert.equal(Scorer.score(-70, 60, -5), 0);
      assert.equal(Scorer.score(-70, 60, -70), -10);
      assert.equal(Scorer.score(-70, 60, 60), 10);

      assert.equal(Scorer.score(-7, 6, -0.5), 0);
      assert.equal(Scorer.score(-7, 6, 6), 10);
      assert.equal(Scorer.score(-17, 6, -17), -10);
      done();
    });
  });

});
