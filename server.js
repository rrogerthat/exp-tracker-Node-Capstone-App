"use strict";

const express = require('express');
const app = express();	//creates Express app.
app.use(express.static('public'));	//to serve static assets from public folder.
app.listen(process.env.PORT || 8080, () => {	//visit localhost:8080 in browser.
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});	

app.get('/', (req, res) => res.status(200).send('okay'));

module.exports = app;	//so test can use.