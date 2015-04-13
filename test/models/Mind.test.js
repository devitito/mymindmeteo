require('should');

describe('Mind', function() {

 it ('should have the same amount of documents as in fixtures', function(done) {
    Mind.find().exec(function(err, minds) {
      minds.length.should.be.eql(3);
      done();
    });
  });

});
