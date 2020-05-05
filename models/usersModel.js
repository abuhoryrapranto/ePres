const mongoose = require('mongoose');

const saveUser  = mongoose.Schema({

	first_name: {
		type: String,
		required: true
	},

	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique:true
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	craeted_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('members', saveUser)