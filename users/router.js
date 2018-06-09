'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');

const router = express.Router();  
const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/register', jsonParser, (req, res) => { //Post request to /users/register. 
  console.log(req.body);
  const requiredFields = ['firstName', 'username', 'password'];   //In Postman, input JSON obj under raw. Choose JSON type.
  const missingField = requiredFields.find(field => !(field in req.body));
 
  if (missingField) {                 //Do these checks get to the front-end? Create our own notifications in client.js?
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  //check that they are strings
  const stringFields = ['username', 'password', 'firstName', 'lastName'];	//same format in req.body too
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  //check for whitespaces 
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field] //trim() method removes whitespace from both ends of a string.
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
  //check inputted lengths
  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 6,
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(  //Object.keys returns an array of properties.
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField      //if .find found something under tooSmallField, field would display here.
        ? `Must be at least ${sizedFields[tooSmallField]  //Ternary operator (chooses either u/n or pw in tooSmallField)
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField  //which field failed the check (u/n or pw)
    });
  }
  //check if username already in db
  let {username, password, firstName = '', lastName = ''} = req.body;
  
  firstName = firstName.trim(); //un and pw already come in pre-trimmed.
  lastName = lastName.trim();

  return User.find({username}) //Next, because usernames are unique in our system, we check 
    .count()                   //if there is an existing user with the requested name.
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);	//Static method created in models.js using bcryptjs module.
    }) 
    .then(hash => {
      return User.create({
        username,
        password: hash, //store pw in db in hashed form (one-way hash: once hashed, hard to decrypt it back)
        firstName,      //Also are salted hashes- addt'l random data mixed in with pw & also hashed several times.
        lastName
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })              //.catch runs if there was a reject in Promise. What you pass in (err) is msg inside reject().s
    .catch(err => { //If a user with the requested name already exists, we reject the promise with an error object.
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});  //error not due to u/n already existing.
    });
});

module.exports = {router};