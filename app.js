const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());

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

app.listen(process.env.PORT || 5000);