const securityAPI 		= require('../api/securityAPI');


module.exports = (app, router) => {
	
	router.put('/me/:id', securityAPI.update);

	router.put('/profile/:id', securityAPI.updateUser);

	router.delete('/delete', securityAPI.deleteUser);

};