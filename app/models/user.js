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
    companyId: {
      type: String
    },
    adminLevel: {
      type: String,
      enum: ['0', '1', '2', '3'],
      default: '3'
    },
    approved: {
      type: String,
      enum: ['pending', 'approved', 'denied'],
      default: 'denied'
    }
  }
});


//Model Methods
userSchema.methods.getFullName = function(){
  var name = this.firstName + ' ' + this.lastName;
  console.log("Full Name is: " + name);
  return name;
};

module.exports = mongoose.model('User', userSchema);