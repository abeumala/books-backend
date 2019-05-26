require('../models/book');
const mongoose = require('mongoose'),
	Book = mongoose.model('Book'),
	jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
	config = require('../config/config')
	
const BooksAPI = () => {};

BooksAPI.getAll = (req, res) => {
	
	Book.find( (err, books) => {
		if (err) {
			return res.json({ 
				success: false, 
				error: err,
				errors: {
					book: "This book already exists",
				}
			});
		}

		return res.json({
			success: true, 
			books: books,
		});
	});
}

BooksAPI.create = (req, res) => {
	let book = new Book();

	if (req.body.title != undefined) {
		book.title = req.body.title;	
	}

	if (req.body.description != undefined) {
		book.description = req.body.description;	
	}

	if (req.body.author != undefined) {
		book.author = req.body.author;
	}

	if (req.body.coverUrl != undefined) {
		book.coverUrl = req.body.coverUrl;
	}

	book.save( (err) => {
		if (err) {
			// duplicate entry
			if (err.code == 11000) { 
				res.status(409);
				return res.json({ 
					success: false, 
					error: err,
					errors: {
						book: "This book already exists",
					}});
				//}
			} else {
				return res.send(err);
			}
		}

		return res.json({
			success: true, 
			book: book,
		});
	});
}

module.exports = BooksAPI;
