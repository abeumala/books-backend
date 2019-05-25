var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('./helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

describe("Post unit test",function(){


	it("should authenticate individual user 1",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
	    // calling home page api
      	server
	    .post("/authenticate")
	    .send({username : user.username, password : user.password})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
        	res.body.should.have.property('user');

	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);

	      	var individualFileContent = JSON.stringify(
	      		{
	      			_id: res.body.user._id, 
	      			username: user.username, 
	      			password: user.password,
	      			email: user.email,
	      			token: res.body.token
	      		});


			fs.writeFile('fakeData/individualUserData1.json', individualFileContent, function (err) {
			  if (err) return console.log(err);
			});

	      	done();
	      	require('./postAPITest')
	    });
	});

	it("should authenticate individual user 1",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/individualUserData2.json', 'utf8'));
	    // calling home page api
      	server
	    .post("/authenticate")
	    .send({username : user.username, password : user.password})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
        	res.body.should.have.property('user');

	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);

	      	var individualFileContent = JSON.stringify(
	      		{
	      			_id: res.body.user._id, 
	      			username: user.username, 
	      			password: user.password,
	      			email: user.email,
	      			token: res.body.token
	      		});


			fs.writeFile('fakeData/individualUserData2.json', individualFileContent, function (err) {
			  if (err) return console.log(err);
			});

	      	done();
	      	require('./postAPITest')
	    });
	});

	it("should authenticate budiness user",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/businessUserData.json', 'utf8'));
	    // calling home page api
      	server
	    .post("/authenticate")
	    .send({facebookId : user.facebookId})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
        	res.body.should.have.property('user');

	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);

	      	var individualFileContent = JSON.stringify(
	      		{
	      			_id: res.body.user._id, 
	      			username: user.username, 
	      			password: user.password,
	      			email: user.email,
	      			token: res.body.token
	      		});


			fs.writeFile('fakeData/businessUserData.json', individualFileContent, function (err) {
			  if (err) return console.log(err);
			});

	      	done();
	      	require('./postAPITest')
	    });
	});

	it("should delete individual test user 1",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
	    // calling home page api

      	server
	    .delete("/me")
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
	});

	it("should delete individual test user 2",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/individualUserData2.json', 'utf8'));
	    // calling home page api

      	server
	    .delete("/me")
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
	});

	it("should delete business test user",function(done){

		var user = JSON.parse(fs.readFileSync('fakeData/businessUserData.json', 'utf8'));
	    // calling home page api

      	server
	    .delete("/me")
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
	});

	it("should not found any individual hotspot",function(done){
		var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
		var hotspot = JSON.parse(fs.readFileSync('fakeData/individualHotspotData.json', 'utf8'));
	    // calling home page api

      	server
	    .delete("/hotspots/"+hotspot._id)
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	(res.status).should.equal(404);
	      	res.body.success.should.equal(false);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	done();
	    });
	});

	it("should not found any business hotspot",function(done){
		var user = JSON.parse(fs.readFileSync('fakeData/businessUserData.json', 'utf8'));
		var hotspot = JSON.parse(fs.readFileSync('fakeData/businessHotspotData.json', 'utf8'));
	    // calling home page api

      	server
	    .delete("/hotspots/"+hotspot._id)
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	(res.status).should.equal(404);
	      	res.body.success.should.equal(false);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	done();
	    });
	});

});