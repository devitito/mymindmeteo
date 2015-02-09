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

			var data = [];
			data.push(Sample.find({id: record.sample_id}));
			data.push(Sensor.find({id: record.sensor_id}));
			data.push(Mind.find({id: record.mind_id}));

			promise.all(data)
			.then(function(promises) {
				var sample = promises[0][0];
				var sensor = promises[1][0];
				var mind = promises[2][0];

				var indexable = {
					id: record.id,
					topic: sensor.topic,
					value: sample.value,
					mind: {name: mind.name, id: mind.id, email: mind.email, joindate: moment.utc(mind.joindate).format('YYYY-MM-DD HH:mm:ss')},
					sensor: {label: sensor.label, meteologist: sensor.meteologist},
					sample: sample.label,
					tstamp: moment.utc(record.date).format('YYYY-MM-DD HH:mm:ss'),
					day: moment.utc(record.date).tz(mind.timezone).day(),
					hour: moment.utc(record.date).tz(mind.timezone).hour(),
					timezone: mind.timezone
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
		values.date = moment.utc().toDate();

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
