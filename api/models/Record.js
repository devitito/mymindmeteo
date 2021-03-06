/**
* Record.js
*
* @description :: Mind's records
*/

var uuid = require('node-uuid');
var promise = require('bluebird');
var moment = require('moment-timezone');

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  schema: true,
  tableName: 'records',

  attributes: {
    id: {
      type: 'string',
      primaryKey : true,
      unique: true
    },
    date: {
      type: 'datetime',
      notNull: true,
    },
    mind_id: {
      notNull: true,
      model: 'Mind'
    },
    sensor_id: {
      notNull: true,
      model: 'Sensor'
    },
    sample_id: {
      notNull: true,
      model: 'Sample'
    }
  },

  toIndexable: function (options, cb) {
    (function _lookupRecordIfNecessary(afterLookup){
      if (typeof options == 'object') return afterLookup(null, options);
      Record.findOne(options).exec(afterLookup);
    })(function (err, record) {
      if (err) return cb(err);

      if (_.isUndefined(record))
        return cb('Record not found');

      var data = [];
      data.push(Sample.find({id: record.sample_id}));
      data.push(Sensor.find({id: record.sensor_id}).populate('samples'));
      data.push(Mind.find({id: record.mind_id}));

      promise.all(data)
      .then(function(promises) {
        var sample = promises[0][0];
        var sensor = promises[1][0];
        var mind = promises[2][0];

        var value0 = sensor.samples[0].value;
        var value1 = sensor.samples[1].value;
        var max = (value0 >= value1) ? value0 : value1;
        var min = (value0 <= value1) ? value0 : value1;

        var indexable = {
          id: record.id,
          topic: sensor.topic,
          value: sample.value,
          mind: {name: mind.name, id: mind.id, email: mind.email, joindate: moment.utc(mind.joindate).tz(mind.timezone).format('YYYY-MM-DD HH:mm:ss')},
          sensor: {label: sensor.label, meteologist: sensor.meteologist},
          sample: {label: sample.label, report_format: sample.report_format},
          tstamp: moment.utc(record.date).tz(mind.timezone).format('YYYY-MM-DD HH:mm:ss'),
          day: moment.utc(record.date).tz(mind.timezone).day(),
          hour: moment.utc(record.date).tz(mind.timezone).hour(),
          timezone: mind.timezone,
          min: min,
          max: max
        }
        cb(null, indexable);
      })
      .catch(function(err) {
        cb(err);
      });
    })
  },

  beforeCreate: function(values, next) {
    values.id = uuid.v4();
    values.date = new Date().toISOString();
    next();
  },

  afterCreate: function(createdRecord, cb) {
    Record.toIndexable(createdRecord, function(err, indexable) {
      if (err) return cb(err);

      ElasticService.index('records', indexable, function IndexedRecord(err, res) {
        if (err) return cb(err);

        console.log('index updated record in elasticsearch');
        cb();
      });
    });
  },
};
