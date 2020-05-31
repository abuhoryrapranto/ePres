const Joi = require('@hapi/joi');

const registerValidation = data => {

	const schema = {

		first_name: Joi.string()
					.required(),

		last_name: Joi.string()
					.required(),

		email: Joi.string()
			   .required()
			   .email(),

		phone: Joi.string()
			   .min(10)
			   .max(10)
			   .required(),

		password: Joi.string()
				  .min(6)
				  .required(),
				  
		bmdc: Joi.string()
			  .required()
	};

	return Joi.validate(data, schema);
}

const updateValidation = data => {

	const schema = {

		first_name: Joi.string()
					.required(),

		last_name: Joi.string()
					.required(),

		email: Joi.string()
			   .required()
			   .email(),

		phone: Joi.number()
			   .integer()
			   .min(1000000000)
			   .max(9999999999)
			   .required(),

		bmdc: Joi.string()
			  .required()
	};

	return Joi.validate(data, schema);
}

const loginValidation = data => {

	const schema = {

		email: Joi.string()
			   .required()
			   .email(),

		password: Joi.string()
				  .min(6)
				  .required()
	};

	return Joi.validate(data, schema);
}

module.exports = {
	registerValidation,
	updateValidation,
	loginValidation
}