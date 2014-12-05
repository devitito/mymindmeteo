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
		  unique: true
	  },
	  name: {
		  type: 'string',
		  size: 64,
		  unique: true,
		  required: true,
		  notNull: true,
		  maxLength: 10
	  },
	  email : {
		  type: 'string',
		  size: 128,
      maxLength: 32,
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
		  maxLength: 12,
		  minLength: 8
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
  
  beforeCreate: function(values, next) {
	  values.id = uuid.v4();
	  values.joindate = new Date();

	  // This checks to make sure the password and password confirmation match before creating record
	  //if (!values.password || values.password != values.confirmation) {
	  //	  return next({err: ["Password doesn't match password confirmation."]});
	  //}
	  require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
		  if (err) return next(err);
		  values.password = encryptedPassword;
		  // values.online= true;
		  next();
	  });
  }
};
