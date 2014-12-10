/**
* Record.js
*
* @description :: Mind's records
*/

var uuid = require('node-uuid');

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
			model: 'Mind'
		},
		sensor_id: {
			model: 'Sensor'
		},
		sample_id: {
			model: 'Sample'
		}
	},

	beforeCreate: function(values, next) {
	  values.id = uuid.v4();
		next();
  }
};
