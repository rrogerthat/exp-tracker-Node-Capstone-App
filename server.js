"use strict";

const express = require('express');
const mongoose = require('mongoose');	//assists in communicating with Mongo db.
const morgan = require('morgan');	//logging middleware
const passport = require('passport');
// const bodyParser = require('body-parser');	//don't need for posts to /users to work?

const { router: usersRouter } = require('./users'); //rename router to usersRouter (Obj destr assignment)
// const { router: authRouter } = require('./auth');
// const {localStrategy} = require('./auth');

//config.js is where we control constants for entire app like PORT and DATABASE_URL
const { PORT, DATABASE_URL } = require('./config'); 

mongoose.Promise = global.Promise;


const app = express();	//creates Express app.
app.use(morgan('common'));	//use common style for logging (also for catch/try error logging)
app.use(express.static('public'));	//to serve static assets from public folder.
// app.use(bodyParser.json());

// passport.use(localStrategy);
app.use('/users', usersRouter); //Requests to /users is redirected to usersRouter (renamed from router)
// app.use('/auth', authRouter);  

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
        return reject(err);               //promise not fulfilled.
      }
      server = app.listen(port, () => {   //Tell server where to listen for requests on the configured port. Run http server.
        console.log(`Your app is listening on port ${port}`);	//localhost:8080
        resolve();                        //promise fulfilled.
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
      server.close(err => {	//referring to server variable in runServer function
        if (err) {
          return reject(err);
        }
        resolve();  //if no error, promise fulfilled.
      });
    });
  });
}

// If server.js is called directly (with `node server.js`), this block runs since we still need to connect to db.
// When a file is run directly from Node.js, require.main is set to its module.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };	//export so tests can also run server.