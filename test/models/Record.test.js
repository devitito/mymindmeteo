var should = require('should');

describe('Record model', function() {

  describe('toIndexable() method', function() {

    it ('should return a valid object', function(done) {
      this.cb = function(err, indexable) {
        should.not.exist(err);
        should.exist(indexable);
        indexable.should.be.type('object');
        done();
      }
      Record.toIndexable('543542433bb5d', this.cb);
    });

    xit ('should use UTC date for tstamp attribute', function(done) {
      //depends on server timezone configuration... Test not reliable
      this.cb = function(err, indexable) {
        should.not.exist(err);
        should.exist(indexable);
        indexable.should.have.property('tstamp');
        indexable.tstamp.should.be.equal('2014-10-08 11:55:15');
        done();
      }
      Record.toIndexable('543542433bb5d', this.cb);
    });

    xit ('should use locale time for hour attribute', function(done) {
      //depends on server timezone configuration... Test not reliable
      this.cb = function(err, indexable) {
        should.not.exist(err);
        should.exist(indexable);
        indexable.should.have.property('hour');
        indexable.hour.should.be.equal(13);
        done();
      }
      Record.toIndexable('543542433bb5d', this.cb);
    });

    it ("should return an error if the Record couldn't be found", function(done) {
      this.cb = function(err, indexable) {
        should.not.exist(indexable);
        should.exist(err);
        err.should.be.equal('Record not found');
        done();
      }
      Record.toIndexable('543542433bd', this.cb);
    });
  });

});
