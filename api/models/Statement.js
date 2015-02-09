/**
* Statement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	autoUpdatedAt: false,
  schema: true,
	tableName: 'statements',

  attributes: {
		body: {
			type: 'text',
		  //size: 2048,
		  //unique: true,
		  required: true,
		  notNull: true,
		  maxLength: 2048
		},
		notread: {
			type: 'string',
			size: 32,
			notNull: true,
		},
		mind_id: {
			notNull: true,
			model: 'Mind'
		},
		report_id: {
			notNull: true,
			model: 'Report'
		},
	},
};

