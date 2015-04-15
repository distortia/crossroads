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
  	//Maybe use an enum to only allow for valid us states
  	state: {
  		type: "string",
  		required: true
  	},

  	zipCode: {
  		type: "integer",
  		required: true
  	},

  	users: {
  		collection: "user"
  		via: "company"
  	},

  	owner: {
  		model: "user"
  	}

  }
};

