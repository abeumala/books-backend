const authAPI 		= require('../api/authAPI');


module.exports = (app, router) => {
	
	router.post('/register', authAPI.register);

	router.post('/authenticate', authAPI.authenticate);

};