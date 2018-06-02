'use strict';

const { Expense } = require('./models');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const jwtAuth = passport.authenticate('jwt', { session: false });

mongoose.Promise = global.Promise;

const router = express.Router(); 
router.use(bodyParser.json());

router.get('/:category', (req, res) => {	//request to /items/:category
	Expense
	.find({category: req.params.category})
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
})

router.post('/entry', (req, res) => {
	const requiredFields = ['category', 'description', 'cost'];
	for(let i = 0; i <= requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Please fill out \'${field}\' in entry form`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Expense
	.create({
		category: req.body.category,
		date: req.body.date,
		description: req.body.description,
		cost: req.body.cost
	})
	.then(expense => res.status(201).json(expense.serialize()))
	.catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
})


module.exports = {router};