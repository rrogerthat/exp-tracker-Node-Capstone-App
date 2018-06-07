require('dotenv').config();
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

  for (i = 0; i <5; i++) { //total 30 entries
    seedData.push(generateExpenseData());
  }

  return Expense.insertMany(seedData);
}

function generateDescription() {
  const description = ['Costco gas', 'McDonalds', 'Garden Cafe', 'Las Vegas', 'contact lenses', 'birthday gift'];
  return description[Math.floor(Math.random() * description.length)];
}

function generateExpenseData() {
	return {
		userId: userId,	//variable created at login under beforeEach
		category: 'gas',
		date: faker.date.past(),
		description: generateDescription(),
		cost: faker.commerce.price()
	},
  {
    userId: userId, 
    category: 'restaurants',
    date: faker.date.past(),
    description: generateDescription(),
    cost: faker.commerce.price()
  },
  {
    userId: userId, 
    category: 'entertainment',
    date: faker.date.past(),
    description: generateDescription(),
    cost: faker.commerce.price()
  },
  {
    userId: userId, 
    category: 'groceries',
    date: faker.date.past(),
    description: generateDescription(),
    cost: faker.commerce.price()
  },
  {
    userId: userId, 
    category: 'medical',
    date: faker.date.past(),
    description: generateDescription(),
    cost: faker.commerce.price()
  },
  {
    userId: userId, 
    category: 'misc',
    date: faker.date.past(),
    description: generateDescription(),
    cost: faker.commerce.price()
  }
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//before and after for 
describe('Expenese API resource', function() {	//test sample to make sure testing modules work.

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

  describe('GET endpoint', function() {
    //test get request for all categories using for loop
    const categoryArr = ['gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'misc'];

    for (i = 0; i < categoryArr.length; i++) {
      it('list expenses based on category on GET', function() {
        let res;
        
        return chai.request(app)    //${categoryArr[i]}
          .get(`/items/${categoryArr[i]}`)
          .set('Authorization', `Bearer ${token_test}`)
          .then(function(_res) {
            res = _res;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.expenses).to.be.a('array');
            expect(res.body.expenses).to.have.lengthOf.at.least(1);

            const expectedKeys = ['created', 'category', 'date', 'description', 'cost']; //'created' in response only. Id is in db.
            res.body.expenses.forEach(function(item) {
              expect(item).to.be.a('object');
              expect(item).to.include.keys(expectedKeys);
            });
            resExpense = res.body.expenses[0];
            return Expense.findById(resExpense.created); //find in db using id from response body (created).
          })
          .then(function(expense) {
            const date = new Date(expense.date);  //date in db is not formatted the same as in res.body so need to change
            const newDateFormat = (("0" + (date.getMonth() + 1)).slice(-2)) + '/' + ("0" + date.getDate()).slice(-2) + '/' +  date.getFullYear();

            expect(resExpense.created).to.equal(expense.id); //compare response body to db
            expect(resExpense.category).to.equal(expense.category);
            expect(resExpense.date).to.equal(newDateFormat);
            expect(resExpense.description).to.equal(expense.description);
            expect(resExpense.cost).to.contain(expense.cost);
          });
      });
    }
  });
  
  describe('POST endpoint', function() {
    it('should add a new expense', function() {
      const newExpense = generateExpenseData();

      return chai.request(app)
      .post('/items/entry')
      .set('Authorization', `Bearer ${token_test}`)
      .send(newExpense)
        .then(function(res) {
          const date = new Date(newExpense.date);
          const newDateFormat = (("0" + (date.getMonth() + 1)).slice(-2)) + '/' + ("0" + date.getDate()).slice(-2) + '/' +  date.getFullYear();

          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'created', 'category', 'date', 'description', 'cost');
          expect(res.body.created).to.not.be.null;
          expect(res.body.category).to.equal(newExpense.category);
          expect(res.body.date).to.equal(newDateFormat);
          expect(res.body.description).to.equal(newExpense.description);
          expect(res.body.cost).to.equal(newExpense.cost);
          return Expense.findById(res.body.created);
        })
        .then(function(expense) {
          const olddate = new Date(newExpense.date);
          const newDateFormat = (("0" + (olddate.getMonth() + 1)).slice(-2)) + '/' + ("0" + olddate.getDate()).slice(-2) + '/' +  olddate.getFullYear();

          const firstdate = new Date(expense.date);
          const secDateFormat = (("0" + (firstdate.getMonth() + 1)).slice(-2)) + '/' + ("0" + firstdate.getDate()).slice(-2) + '/' +  firstdate.getFullYear();

          expect(expense.category).to.equal(newExpense.category);
          expect(secDateFormat).to.equal(newDateFormat);
          expect(expense.description).to.equal(newExpense.description);
          expect(Number.parseFloat(expense.cost).toFixed(2)).to.equal(newExpense.cost);
        });
    });
  });

  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        description: 'new car',
        category: 'misc'
      };

      return Expense
        .findOne()
        .then(function(expense) {
          updateData.id = expense.id;
          return chai.request(app)
            .put(`/items/update/${expense.id}`)
            .set('Authorization', `Bearer ${token_test}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(200);

          return Expense.findById(updateData.id);
        })
        .then(function(expense) {
          expect(expense.description).to.equal(updateData.description);
          expect(expense.category).to.equal(updateData.category);
        });
    });
  });

  describe('DELETE endpoint', function() {
    it('delete an expense by id', function() {

      let expense;

      return Expense
        .findOne()
        .then(function(_expense) {
          expense = _expense;
          return chai.request(app)
          .delete(`/items/entry/${expense.id}`)
          .set('Authorization', `Bearer ${token_test}`)
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Expense.findById(expense.id);
        })
        .then(function(_expense) {
          expect(_expense).to.be.null;
        });
    });
  });

});

