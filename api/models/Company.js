/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	companyName: {
  		type: "string",
  		unique: true,
  		required: true
  	},

  	street: {
  		type: "string",
  		required: true
  	},

  	city: {
  		type: "string",
  		required: true
  	},

  	state: {
  		type: "string",
  		required: true
  	},

  	zipCode: {
  		type: "string",
  		required: true,
  		maxLength: 5
  	},

  	owner: {
  		model: "user"
  	},
  	userList: {
  		collection: "user",
  		via: 'companyList'
  	},
    plan: {
      type: "string",
      enum: ['essential', 'business', 'enterprise'],
      defaultsTo: 'essential'
    },

  	toJSON: function() {
  		var obj = this.toObject();
  		delete obj._csrf;
  		return obj;
  	}
  },
};

