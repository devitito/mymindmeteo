/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,
	tableName: 'reports',

  attributes: {

	  title: {
		  type: 'string',
		  size: 128,
		  required: true,
		  notNull: true,
		  maxLength: 128
	  },
		template: {
			type: 'text',
		  //size: 2048,
		  //unique: true,
		  required: true,
		  notNull: true,
		  maxLength: 2048
		},
	  category: {
		  type: 'string',
		  size: 64,
		  required: true,
		  notNull: true,
	  },
	 	range: {
			type: 'string',
			required: true,
		  notNull: true,
		},
	  status: {
		  type: 'string',
		  size: 32,
			notNull: true,
	  },
		meteologist: {
		  notNull: true,
			model: 'Mind'
	  },
	},
};

