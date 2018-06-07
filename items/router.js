'use strict';

const { Expense } = require('./models');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtAuth = passport.authenticate('jwt', { session: false });

mongoose.Promise = global.Promise;

const router = express.Router(); 
router.use(bodyParser.json());

//display expenses by category
router.get('/:category', jwtAuth, (req, res) => {	//request to /items/:category
	Expense
	.find( {category: req.params.category, userId: req.user.id} ) //find data belonging to your ID under serialized User schema
	.then(items => {
		res.json({
			expenses: items.map(item => {	//or function(item) {}	
				return item.serialize();	//remember to put 'return'
			}) //if more than one object put in key, list of obj auto. put inside an array 
		})
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	});
});

//post an expense
router.post('/entry', jwtAuth, (req, res) => {
	const requiredFields = ['category', 'description', 'cost'];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \'${field}\' entry in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Expense
	.create({
		userId: req.user.id,	//so user accesses only his data
		category: req.body.category,
		date: req.body.date,	//in client.js, make required so no 'null' if empty?
		description: req.body.description,
		cost: req.body.cost
	})
	.then(expense => res.status(201).json(expense.serialize()))
	.catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

//to update an expense
router.put('/update/:id', jwtAuth, (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id  === req.body.id)) { //make sure ID's are entered and matched.
		const message = (
      		`Request path id (${req.params.id}) and request body id ` +
      		`(${req.body.id}) must match`);
    	console.error(message);
    	return res.status(400).json({ message: message });
  	}

  	const toUpdate = {};
  	const updateableFields = ['category', 'date', 'description', 'cost'];

  	updateableFields.forEach(field => {
  		if (field in req.body) {
  			toUpdate[field] = req.body[field];	//creating new updated obj with key/value pairs.
  		}
  	});

  	Expense
  	.findByIdAndUpdate(req.params.id, { $set: toUpdate }) //$set operator replaces the value of a field with the specified value.
  	.then(expense => res.status(200).json(expense.serialize())) //sends pre-updated obj in Postman?
  	.catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//to delete an expense
router.delete('/entry/:id', jwtAuth, (req, res) => {
	Expense
	.findByIdAndRemove(req.params.id)
	.then(expense => res.status(204).end()) //if wrong ID, no error msg
	.catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//requests to nonexisting endpoints
router.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});


module.exports = {router};