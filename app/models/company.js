//app/models/company.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    companyName: {
      type: String,
      unique: true,
	  required: true,
    },
    address: {
      type: String,
	  required: true
    },
    city: {
      type: String,
	  required: true
    },
    state: {
      type: String,
	  required: true
    },
    zip: {
      type: String,
	  required: true
    },
    owner: {
      type: String,
	  required: true
    },
	users: {
		userId: {
			type: String,
		}
	}
});

module.exports = mongoose.model('Company', companySchema);