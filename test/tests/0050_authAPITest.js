var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('../helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

// UNIT test begin
var individualUser1 = "individualTestUser1";
var individualEmail1 = "individual1@testemail.com";
var individualPass1 = "individualTestPass1";

var individualUser2 = "individualTestUser2";
var individualEmail2 = "individual2@testemail.com";
var individualPass2 = "individualTestPass2";

var businessUser = "businessTestUser";
var businessEmail = "business@testemail.com";
var businessFacebookId = "businessFacebookId";

describe("/auth unit test",function(){

	

	/*it("should register a new user",function(done){
	    // calling home page api
	    var user = JSON.parse(fs.readFileSync('./testConfig.json', 'utf8'));
	    server
	    .post("/register")
	    .send({username : user.username, password : user.password})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	res.status.should.equal(200);
	      	//(res.body.status).should.be.ok;
	      	res.body.user.should.be.json;
	      	res.body.user._id.should.be.type('string');
	      	(res.body.user.password === undefined).should.be.true;

	      	res.body.token.should.not.equal(null);
	      	res.body.token.should.not.equal(undefined);
	      	res.body.token.should.be.type('string');
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);

	      	done();
	    });
  	});*/

  	it("should return duplicate user",function(done){
	    // calling home page api
	    var user = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	    server
	    .post("/register")
	    .send({username : user.username, email: user.email, password : user.password})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	(res.status).should.equal(409);
	      	res.should.be.json;
    		res.body.should.have.property('success');
    		res.body.success.should.be.type('boolean');
	      	res.body.success.should.be.not.ok;
	      	res.body.success.should.equal(false);
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(false);
	      	(res.body.errors == null).should.equal(false);
	      	done();
	    });
  	});



	it("should return an authenticated user",function(done){

		var user = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
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
	      	done();
	      	require('./postAPITest')
	    });
	});

	/*it("should delete a user",function(done){
	    // calling home page api
	    
  	});*/

});