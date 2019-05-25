// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var CommentSchema = mongoose.Schema({
	title: String,
    content: String,
    voteUp: Number,
    voteDown: Number,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.ObjectId, ref: 'Book'}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', CommentSchema);