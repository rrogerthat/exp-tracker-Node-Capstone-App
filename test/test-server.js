const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');
const {app, runServer, closeServer} = require('../server');  //import server.js and create variable for server.app

const expect = chai.expect;

chai.use(chaiHttp);

//before and after for 
describe('Test', function() {	//test sample to make sure testing modules work.

  before(function() {
    return runServer(DATABASE_URL);                                          
  });

  after(function() {
    return closeServer();
  });


	it('return status code 200 and HTML on GET', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.html;
			});
	});
});