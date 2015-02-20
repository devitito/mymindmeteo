/**
* Sensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');

module.exports = {

	autoCreatedAt: false,
	autoUpdatedAt: false,
	schema: true,
	tableName: 'sensors',

  attributes: {

	  label: {
		  type: 'string',
		  size: 128,
		  unique: true,
		  required: true,
		  notNull: true,
		  maxLength: 128
	  },
	  img : {
		  type: 'string',
		  size: 128,
      maxLength: 32,
		  DefaultTo: null
	  },
	  topic: {
		  type: 'string',
		  size: 64,
		  required: true,
		  notNull: true,
	  },
	  meteologist: {
		  type: 'string',
		  size: 64,
		  required: true,
		  notNull: true,
	  },
	  status: {
		  type: 'string',
		  size: 32,
			notNull: true,
	  },
		samples: {
			notNull: true,
			required: true,
			collection: 'Sample',
			via: 'sensor_id'
		},
		records: {
			collection: 'Record',
			via: 'sensor_id'
		},

		toJSON: function() {
      var obj = this.toObject();
      delete obj.records;
      return obj;
    }
  },

	toIndexable: function (options, cb) {
		(function _lookupSensorIfNecessary(afterLookup){
			if (typeof options == 'object') return afterLookup(null, options);
			Sensor.findOne(options).exec(afterLookup);
  	})(function (err, sensor) {
			if (err) return cb(err);

			//populate associated samples (should be done automaticly with Sensor.find but it is not working)
			Sample.find({sensor_id: sensor.id}, function(err, samples) {
				if (err) return cb(err);

				cb(null, {
					id: sensor.id,
					topic: sensor.topic,
					label: sensor.label,
					status: sensor.status,
					meteologist: sensor.meteologist,
					tstamp: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
					samples: samples
				});
			});
		})
	},

	afterUpdate: function(updatedRecord, cb) {
		Sensor.toIndexable(updatedRecord, function(err, indexable) {
			if (err) return cb(err);

			ElasticService.index('sensors', indexable, function IndexedSensor(err, res) {
				if (err) return cb(err);

				console.log('index updated sensor in elasticsearch');
				cb();
			});
		});
	},

	afterDestroy: function(destroyedRecords, cb) {
		// Destroy any sample whose sensor has an ID of one of the
		// deleted sensor models
		Sample.destroy({sensor_id: _.pluck(destroyedRecords, 'id')}).exec(cb);

		//delete it in ES also
		var results = [];
		async.each(_.pluck(destroyedRecords, 'id'),
							function(record, cb) {
								ElasticService.delete('sensors', record, function deletedSensor(err, res) {
									if (err) results.push(err.message);
									cb();
								});
							},
							function(err) {
								cb(err, results);
		});
	},
};
