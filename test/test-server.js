const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server'); //import server.js and create variable for server.app

const expect = chai.expect;

chai.use(chaiHttp);


describe('Test', function() {
	it('return status code 200 and HTML on GET', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.html;
			});
	});
});