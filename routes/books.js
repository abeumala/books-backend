const booksAPI 		= require('../api/booksAPI');

module.exports = (app, router) => {

	router.post('/books', booksAPI.create);

	router.get('/books', booksAPI.getAll);
};