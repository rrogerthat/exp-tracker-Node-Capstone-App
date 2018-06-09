// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const mongoose = require('mongoose');

// const { app, runServer, closeServer } = require('../server');
// const { User } = require('../users/models');
// const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

// const expect = chai.expect;

// chai.use(chaiHttp);

// describe('registration', function () {
//   const username = 'exampleUser';
//   const password = 'examplePass';
//   const firstName = 'Example';
//   const lastName = 'User';
//   const usernameB = 'exampleUserB';
//   const passwordB = 'examplePassB';
//   const firstNameB = 'ExampleB';
//   const lastNameB = 'UserB';

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//   beforeEach(function () { });

//   afterEach(function () {
//     return User.remove({});
//   });

//   describe('/users/register', function () {
//     describe('POST', function () {
//       it('Should reject users with missing username', function () {
//         return chai
//           .request(app)
//           .post('/users/register')
//           .send({
//             password,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }
//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal('Missing field');
//             expect(res.body.location).to.equal('username');
//           });
//       });
//   	});

  	
//   });


// });