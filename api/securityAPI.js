require('../models/user');
const mongoose = require('mongoose'),
	User = mongoose.model('User'),
	jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../config/config'),
	Randtoken = require('rand-token')

const SecurityAPI = () => {};

SecurityAPI.update = (req, res) => {
	User.findById(req.params.id)
	.exec(async (err, user) => {
		if (err) {
			res.status(500)
			return res.send(err)
		}

		if (!user) {
			res.status(404);
			return res.json({success: false, message: 'User not found'})
		}


        if (req.body.favouriteBook != undefined) {
            let index = user.favouriteBooks.indexOf(req.body.favouriteBook)  //if item not found, returns
            if (index != -1) {
            	user.favouriteBooks.splice(index, 1)
            }else{
            	user.favouriteBooks.push(req.body.favouriteBook)
            }
        }

		user.save( (err, user) => {
			console.log(err)
			if (err) {
				if (err.code == 11000) {
					return res.json({success: false, message: 'This user already exists'})
				}else{
					res.status(500)
					return res.send(err)
				}
			}

			return res.json({success: true, user: user})
		})
	})
}

SecurityAPI.updateUser = (req, res) => {
	User.findById(req.params.id)
	.exec(async (err, user) => {
		if (err) {
			res.status(500)
			return res.send(err)
		}

		if (!user) {
			res.status(404);
			return res.json({success: false, message: 'User not found'})
		}

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
	})
}

SecurityAPI.deleteUser = (req, res) => {
	User.findOneAndRemove(req.params.id)
		.then((response) => res.json({ "message": "user account deleted"}))
}


module.exports = SecurityAPI;
