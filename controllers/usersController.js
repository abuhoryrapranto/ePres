const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../validation');

const saveUser = async (req,res) => {

	const { error } = validation.registerValidation(req.body);
	if(error) return res.status(400).json({message: error.details[0].message});

	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist) return res.status(400).json({message: "Email is already exist"});

	const phoneExist = await User.findOne({phone: req.body.phone});
	if(phoneExist) return res.status(400).json({message: "Phone is already exist"});

	const bmdcExist = await User.findOne({bmdc: req.body.bmdc});
	if(bmdcExist) return res.status(400).json({message: "BMDC code is already exist"});
	
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	 const user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		bmdc: req.body.bmdc,
		password: hashPassword
	});

	try {
		const saveData = await user.save();
		res.json(saveData);

	}catch(err) {
		res.json({message:err})
	}
}

const getAllUsers = async (req,res) => {

	try {
		const users = await User.find({}, {password: 0});
		res.json(users);

	}catch(err) {
		res.json({message: err})
	}
}

const getUser = async (req, res) => {

	try {
		const user = await User.findById({"_id": req.params.id}, {password: 0});
		res.json(user);
	}catch(err) {
		res.json(err);
	}
}

const updateUser = async (req, res) => {

	const { error } = validation.updateValidation(req.body);
	if(error) return res.status(400).json({message: error.details[0].message});

	const data = await User.findOne({"_id": req.params.id}, {email: 1, phone:1});

	if(data.email !== req.body.email) {
		const emailExist = await User.findOne({email: req.body.email});
			if(emailExist) return res.status(400).json({message: "Email is already exist"});
	}

	if(data.phone !== req.body.phone) {
		const phoneExist = await User.findOne({phone: req.body.phone});
			if(phoneExist) return res.status(400).json({message: "Phone is already exist"});
	}

	let id = req.params.id;
	const user = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		bmdc: req.body.bmdc
	}

	try {
		const updateData = await User.findByIdAndUpdate(id, {$set: user});
		res.json(user);

	}catch(err) {
		res.json({message:err});
	}
}

const userLogin = async (req, res) => {

	const { error } = validation.loginValidation(req.body);
	if(error) return res.status(400).json({message: error.details[0].message});

	const user = await User.findOne({
		"$and": [{
		"email" :  req.body.email
	},{	"is_active" : 1
	}]
	});
	if(!user) return res.status(400).json({message: "Email Not found"});

	const password = await bcrypt.compare(req.body.password, user.password);
	if(!password) return res.status(400).json({message: "Password is Not valid"});

	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
	res.header('auth_token', token).send(token);
	//return res.status(200);

}

module.exports = {
	saveUser,
	getAllUsers,
	getUser,
	updateUser,
	userLogin
}