// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  encryptedPassword: String,
  company: {
    companyName: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    owner: String,
    adminLevel: String,
    approved: String
  }
  
});


//Model Methods
userSchema.methods.getFullName = function(){
  var name = this.firstName + ' ' + this.lastName;
  console.log("Full Name is: " + name);
  return name;
}

module.exports = mongoose.model('User', userSchema);