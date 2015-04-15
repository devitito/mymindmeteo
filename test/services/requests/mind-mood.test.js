/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

var sinon = require('sinon'),
    should = require('should'),
    moment = require('moment-timezone');

describe('mind-mood ES request', function () {

  describe("query() method", function() {

    before(function() {
      //Set server time zone
      moment.tz.setDefault('America/Los_Angeles');
      //moment.tz.setDefault('Europe/Paris');
      //console.log(moment().zoneName());
      //set server's current locale time to "2011-10-01 15:55:55"
      this.clock = sinon.useFakeTimers(new Date("2011-10-01 15:55:55.001-07:00").getTime());
    });

    after(function() {
      this.clock.restore();
      moment.tz.setDefault(null);
      //console.log(moment().zoneName());
    });

    it("should use mind's locale timezone to select the range of records", function(done) {
      var adapter = require('../../../api/services/requests/mind-mood.js');
      var query = adapter.query({id:1, timezone:'Europe/Helsinki'});

      //console.log(moment().format());
      //console.log(moment.utc().format());

      should.exist(query);
      should.exist(query.body.query.filtered.filter.range.tstamp.gte);
      query.body.query.filtered.filter.range.tstamp.gte.should.be.equal("2011-10-02 00:00:00");

      var query = adapter.query({id:1, timezone:'Europe/London'});
      query.body.query.filtered.filter.range.tstamp.gte.should.be.equal("2011-10-01 00:00:00");
      done();
    });

  });

});
