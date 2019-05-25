const authAPI 		= require('../api/authAPI');


module.exports = (app, router) => {
	
	router.post('/register', {
		console.log("in backend route")
		authAPI.register
		});

	router.post('/authenticate', authAPI.authenticate);

};