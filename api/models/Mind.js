/**
* Mind.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'minds',
  attributes: {
	  name: {
		  type: 'string',
		  size: 64,
		  unique: true,
		  required: true
	  },
	  email : {
		  type: 'string',
		  size: 128,
		  email: true,
		  required: true,
		  unique: true
	  },
	  password: {
		  type: 'string',
		  size: 128,
		  required: true
	  },
	  joindate: {
		  type: 'utcdatetime'
	  },
	  timezone: {
		  type: 'string',
		  size: 64,
		  defaultsTo: 'Europe/Paris'
	  },
	  locale: {
		  type: 'string',
		  size: 32,
		  defaultsTo: 'en_EN'
	  },
	  role: {
		  type: 'string',
		  size: 32,
		  defaultsTo: 'mind'
	  },
	  nameoremail: {
		  type: 'string'
	  },
	  
	  toJSON: function() {
		  var obj = this.toObject();
		  delete obj.password;
		  delete obj._csrf;
		  return obj;
	  }

  }
};

