const securityAPI 		= require('../api/securityAPI');


module.exports = (app, router) => {
	
	router.put('/me/:id', securityAPI.update);

};