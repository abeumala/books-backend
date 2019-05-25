require('../models/comment');
const mongoose = require('mongoose'),
	Comment = mongoose.model('Comment'),
	jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../config/config')
	
const CommentsAPI = () => {};

CommentsAPI.getAll = (req, res) => {

	console.log(req)

	Comment.find({book: req.query.bookId}, (err, comments) => {
		if (err) {
			return res.json({ 
				success: false, 
				error: err,
				errors: {
					comment: "Error fetching comments",
				}
			});
		}

		return res.json({
			success: true, 
			comments: comments,
		});
	});
}

CommentsAPI.create = (req, res) => {
	let comment = new Comment();

	if (req.body.title != undefined) {
		comment.title = req.body.title;	
	}

	if (req.body.content != undefined) {
		comment.content = req.body.content;	
	}

	if (req.body.user != undefined) {
		comment.user = req.body.user;
	}

	if (req.body.book != undefined) {
		comment.book = req.body.book;
	}

	comment.voteUp = 0
	comment.voteDown = 0

	comment.save( (err) => {
		if (err) {
			// duplicate entry
			if (err.code == 11000) { 
				res.status(409);
				return res.json({ 
					success: false, 
					error: err,
					errors: {
						comment: "This comment already exists",
					}});
				//}
			} else {
				return res.send(err);
			}
		}

		return res.json({
			success: true, 
			comment: comment,
		});
	});
}

CommentsAPI.update = (req, res) => {

	Comment.findById(req.params.id)
	.exec(async (err, comment) => {
		if (err) {
			res.status(500)
			return res.send(err)
		}

		if (!comment) {
			res.status(404);
			return res.json({success: false, message: 'Comment not found'})
		}

		if (req.body.voteUp) {
			comment.voteUp = comment.voteUp + 1;	
		}else{
			comment.voteDown = comment.voteDown + 1;	
		}

		comment.save( (err, comment) => {
			if (err) {
				if (err.code == 11000) {
					return res.json({success: false, message: 'This comment already exists'})
				}else{
					res.status(500)
					return res.send(err)
				}
			}

			return res.json({success: true, comment: comment})
		})
	})
}

module.exports = CommentsAPI;
