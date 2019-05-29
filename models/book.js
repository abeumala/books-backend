// load the things we need
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');


const BookSchema = mongoose.Schema({
	title: String,
    description: String,
    author: String,
    coverUrl: String,
    bookCoverUrl: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Book', BookSchema);