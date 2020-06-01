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
		type: Number,
		required: true,
		unique: true,
		validate: {
       validator: function(v) {
         return /^([0-9]{10}$)/.test(v);
       }}
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	bmdc: {
		type: String,
		required: true
	},
	is_active: {
		type: Number,
		default: 0
	},
	craeted_at: {
		type: Date,
		default: Date.now
	}
	
}, { strict: false });

module.exports = mongoose.model('members', saveUser)