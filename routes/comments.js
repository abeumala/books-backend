const commentsAPI 		= require('../api/commentsAPI');

module.exports = (app, router) => {

	router.get('/comments', commentsAPI.getAll);

	router.post('/comments', commentsAPI.create);

	router.put('/comments/:id', commentsAPI.update);

	// router.get('/profile/:id', commentsAPI.getUserComments)
};