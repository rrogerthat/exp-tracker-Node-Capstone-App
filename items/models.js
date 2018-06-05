'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expSchema = mongoose.Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User'}, //store userId's which belong to each user account
	category: {type: String, required: true},
	date: {type: Date, required: true},
	description: {type: String, required: true},
	cost: {type: Number, required: true}
	
});

expSchema.methods.serialize = function() {	//serialize is self-created method name
	const date = new Date(this.date);

	return {
		category: this.category,
		date: (("0" + (date.getMonth() + 1)).slice(-2)) + '/' + ("0" + date.getDate()).slice(-2) + '/' +  date.getFullYear(),
		description: this.description,
		cost: `${this.cost.toFixed(2)}`,
		created: this._id
	}
}

//Expense becomes collection name in database. Behind the scenes, Mongoose works with db.expenses for each created.
const Expense = mongoose.model('Expense', expSchema);
module.exports = {Expense};