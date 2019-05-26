require('../models/user');
const mongoose = require('mongoose'),
	User = mongoose.model('User'),
	jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../config/config'),
	Randtoken = require('rand-token')

const SecurityAPI = () => {};

SecurityAPI.update = (req, res) => {
	const favouriteBook = req.body.favouriteBook
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
            let index = user.favouriteBooks.map((item) => {return item}).indexOf(favouriteBook)  //if item not found, returns -1
            // console.log(user.favouriteBooks)
            // console.log(index)
            if (index != -1) {
            	user.favouriteBooks.splice(index, 1)
            }else{
            	user.favouriteBooks.push(favouriteBook)
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

module.exports = SecurityAPI;
