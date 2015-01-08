
var FooController = require('../../api/controllers/AdminController'); 
//var sinon = require('sinon');   
var assert = require('assert'); 
describe('Array', function(){
	this.timeout(5000);
  describe('#indexOf()', function(){
		this.timeout(5000);
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})
