// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    email: true
  },
  phone: {
    type: String
  },
  encryptedPassword: {
    type: String
  },
  company: {
    companyName: {
      type: String,
      unique: true
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    owner: {
      type: String
    },
    adminLevel: {
      type: String,
      defaultsTo: '3',
      enum: ['0', '1', '2', '3']
    },
    approved: {
      type: String,
      defaultsTo: 'denied',
      enum: ['pending', 'approved', 'denied']
    }
  } // End company
});


//Model Methods
userSchema.methods.getFullName = function(){
  var name = this.firstName + ' ' + this.lastName;
  console.log("Full Name is: " + name);
  return name;
};

module.exports = mongoose.model('User', userSchema);