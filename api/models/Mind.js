/**
* Mind.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var uuid = require('node-uuid');

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  schema: true,		
  tableName: 'minds',
  attributes: {
	  
	  id: {
		  type: 'string',
		  primaryKey : true,
		  unique: true,
	  },
	  name: {
		  type: 'string',
		  size: 64,
		  unique: true,
		  required: true,
		  notNull: true,
	  },
	  email : {
		  type: 'string',
		  size: 128,
		  email: true,
		  required: true,
		  unique: true,
		  notNull: true,
	  },
	  password: {
		  type: 'string',
		  size: 128,
		  required: true,
		  notNull: true,
	  },
	  joindate: {
		  type: 'datetime',
		  notNull: true,
	  },
	  timezone: {
		  type: 'string',
		  size: 64,
		  defaultsTo: 'Europe/Paris',
		  notNull: true,
	  },
	  locale: {
		  type: 'string',
		  size: 32,
		  defaultsTo: 'en_EN',
		  notNull: true,
	  },
	  role: {
		  type: 'string',
		  size: 32,
		  defaultsTo: 'mind',
		  notNull: true,
	  },
	  
	  toJSON: function() {
		  var obj = this.toObject();
		  delete obj.password;
		  delete obj._csrf;
		  return obj;
	  }

  },
  
  beforeCreate: function(values, callback) {
	  values.id = uuid.v4();
	  callback();
  }
};

