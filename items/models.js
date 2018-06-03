'use strict';

const mongoose = require('mongoose');

const expSchema = mongoose.Schema({
	category: {type: String, required: true},
	date: {type: Date, required: true},
	description: {type: String, required: true},
	cost: {type: Number, required: true}
});

expSchema.methods.serialize = function() {	//serialize is self-created method name
	const date = new Date(this.date);

	return {
		category: this.category,
		date: (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(),
		description: this.description,
		cost: `${this.cost.toFixed(2)}`
		// created: this._id
	}
}

//Expense becomes collection name in database. Behind the scenes, Mongoose works with db.expenses for each created.
const Expense = mongoose.model('Expense', expSchema);
module.exports = {Expense};