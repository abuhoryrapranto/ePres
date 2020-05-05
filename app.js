const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

const usersRoute = require('./routes/users');

app.use('/api', usersRoute);

mongoose.connect(process.env.DB_CONNECTION, 
	{ 	
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	}, 
	() => console.log('Connected to Database!')
	);

app.listen(5000);