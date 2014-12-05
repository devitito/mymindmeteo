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
					tstamp: moment().format('YYYY-MM-DD HH:MM:SS'),
					samples: samples
				});
			});
		})
	},

	afterDestroy: function(destroyedRecords, cb) {
		// Destroy any sample whose sensor has an ID of one of the
		// deleted sensor models
		Sample.destroy({sensor_id: _.pluck(destroyedRecords, 'id')}).exec(cb);
	}
};
