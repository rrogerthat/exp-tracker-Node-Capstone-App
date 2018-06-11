"use strict";

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');	
const morgan = require('morgan');	
const passport = require('passport');
const bodyParser = require('body-parser');	

const { router: usersRouter } = require('./users'); //rename router to usersRouter (Obj destr assignment)
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: expRouter } = require('./items/router');

//config.js is where we control constants for entire app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config'); 

mongoose.Promise = global.Promise;

const app = express();	
app.use(morgan('common'));	
app.use(express.static('public'));	
app.use(bodyParser.json());

passport.use(localStrategy);
passport.use(jwtStrategy); 

app.use('/users', usersRouter); //Requests to /users is redirected to usersRouter (renamed from router)
app.use('/auth', authRouter);  
app.use('/items', expRouter);

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


app.get('/', (req, res) => res.status(200).send('okay'));

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here and then assign a value to it in run
// closeServer assumes runServer has run and set `server` to a server object (extra check this way)
let server;

// this function connects to our database, then starts the runServer
function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {  //Use Mongoose to connect to the database, using the URL from config.js
      if (err) {
        return reject(err);               
      }
      server = app.listen(port, () => {   
        console.log(`Your app is listening on port ${port}`);	
        resolve();                        
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {	
        if (err) {
          return reject(err);
        }
        resolve();  
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };	