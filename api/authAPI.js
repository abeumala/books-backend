require('../models/user');
const mongoose = require('mongoose'),
	User = mongoose.model('User'),
	jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../config/config'),
	Randtoken = require('rand-token')

const AuthAPI = () => {};

AuthAPI.register = (req, res) => {
	let user = new User();

	if (req.body.username != undefined) {
		user.username = req.body.username;	
	}

	if (req.body.email != undefined) {
		user.email = req.body.email;	
	}

	if (req.body.password != undefined) {
		user.password = req.body.password;
	}

	user.save( (err) => {
		if (err) {
			// duplicate entry
			if (err.code == 11000) { 
				res.status(409);
				return res.json({ 
					success: false, 
					error: err,
					errors: {
						username: "This user already exists",
					}});
				//}
			} else {
				return res.send(err);
			}
		}

		return res.json({
			success: true, 
			user: user,
		});
	});
}

AuthAPI.authenticate = (req, res) => {
	
	User.findOne({'username': req.body.username}, (err, user) => {
		if (err) throw err;

		if (user) {
			
			if (req.body.password && req.body.password != user.password) {
				//res.statusCode = 401;
				res.status(404);
				return res.json({ 
					success: false, 
					errors: {
						password: 'Authentication failed. Wrong password.' 
					}
				});

			} else {
				user.save();
				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				});

				return res.json({
					success:true,
					user: user,
					token: token
				});
			}	
		}

	});
}

module.exports = AuthAPI;
