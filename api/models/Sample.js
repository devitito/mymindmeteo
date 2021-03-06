/**
* Sample.js
*
* @description :: Possible values of each sensor
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var uuid = require('node-uuid');

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  schema: true,
  tableName: 'samples',

  attributes: {
    id: {
      type: 'string',
      primaryKey : true,
      unique: true
    },
    //sensor_id
    label: {
      type: 'string',
      size: 32,
      notNull: true,
      required: true
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
    value: {
      type: 'integer',
      size: 11,
      required: true,
      notNull: true
    },
    report_format: {
      type: 'string',
      size: 256,
      DefaultTo: null
      //model: 'Label'
    },
    sensor_id: {
      //notNull: true,
      //required: true,
      model: 'Sensor'
    },
    records: {
      collection: 'Record',
      via: 'sample_id'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.records;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    values.id = uuid.v4();
    next();
  },

};
