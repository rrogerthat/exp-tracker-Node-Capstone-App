'use strict';

const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
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

UserSchema.methods.validatePassword = function(password) {  //create method on User object?
  return bcrypt.compare(password, this.password); //Boolean
};

UserSchema.statics.hashPassword = function(password) { 
  return bcrypt.hash(password, 10); //10 stands for how many times salting algorithm is applied.
};	//Hashing is a process that converts a raw, plain text pw to a string of (in principle) unguessable characters.

const User = mongoose.model('User', UserSchema); //new User model created using UserSchema. 
												 //User becomes collection name in db and mongoose works off of "db.users"
module.exports = {User};						 //to access schema outside the file.