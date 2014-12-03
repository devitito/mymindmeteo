/**
* Sensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
	  }
  },
};

