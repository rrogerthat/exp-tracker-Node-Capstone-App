const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { Expense } = require('../items/models');

const {app, runServer, closeServer} = require('../server');  //import server.js and create variable for server.app

const expect = chai.expect;
chai.use(chaiHttp);

let token_test; //global variable

function seedExpenseData() {
	console.info('seeding expense data');
	const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateExpenseData());
  }

  return Expense.insertMany(seedData);
}

function generateCategoryName() {
  const category = [
    'gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'misc'];
  return category[Math.floor(Math.random() * category.length)];
}

function generateDescription() {
  const description = ['Costco gas', 'McDonalds', 'Garden Cafe', 'Las Vegas', 'contact lenses', 'birthday gift'];
  return description[Math.floor(Math.random() * description.length)];
}

function generateExpenseData() {
	return {
		userId: userId,	//variable created at login under beforeEach
		category: generateCategoryName(),
		date: faker.date.past(),
		description: generateDescription(),
		cost: faker.commerce.price()
	};
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//before and after for 
describe('Expenese API resource', function() {	//test sample to make sure testing modules work.
  // const username = 'testuser';
  // const password = 'testpass';
  // const firstName = 'Roger';
  // const lastName = 'Hwang';

  before(function() {
    return runServer(TEST_DATABASE_URL);	//put environmental variables in Travis CI settings                                     
  });

  beforeEach(function() {
  	return chai.request(app)
  	.post('/users/register')
  	.send({firstName:"Roger", lastName:"Hwang", username:"rogertest", password:"123456"})
  	.then(function(res) {
  		userId = res.body.id; 
  		return chai.request(app)
  			.post('/auth/login')
  			.send({username:"rogertest", password:"123456"})
  			.then(function(res) {
  				token_test = res.body.authToken; //becomes global variable
  			})
  			.then(function() {
  				return seedExpenseData();
  			});
  	});
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


	it('return status code 200 and HTML on GET', function() {
		return chai.request(app)
			.get('/')
			.set('Authorization', `Bearer ${token_test}`)
			.then(function(_res) {
				res = _res;
				expect(res).to.have.status(200);
				expect(res).to.be.html;
			});
	});
});