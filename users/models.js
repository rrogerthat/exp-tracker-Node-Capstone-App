'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //to hash pw's

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id, //to distinguish each user by ID in order to retrieve their data
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

UserSchema.methods.validatePassword = function(password) {  
  return bcrypt.compare(password, this.password); //Boolean
};

UserSchema.statics.hashPassword = function(password) { 
  return bcrypt.hash(password, 10); 
};	

const User = mongoose.model('User', UserSchema); //new User model created using UserSchema. 
												 //User becomes collection name in db and mongoose works off of "db.users"
module.exports = {User};					