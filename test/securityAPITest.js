var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var config = require('../config/config');
var helper = require('./helpers/testHelper');
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

// UNIT test begin

describe("/me unit test",function(){

  it("should return me",function(done){
  	  var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));

	  server
	    .get("/me")
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);

        	res.body.should.have.property('user');
	      	//(res.body.status).should.be.ok;
	      	res.body.user.should.be.json;
	      	res.body.user._id.should.be.type('string');
	      	(res.body.user.password === undefined).should.be.true;
	      	// Error key should be false.
	      	//Array length més petit que el límit
	        (res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  });

  it("should return unauthorized",function(done){
    server
    .get("/me")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(403);
        // Error key should be false.
        (res.body.error == null).should.equal(true);
        (res.body.errors == null).should.equal(true);
        done();
    });
  });

  it("should update me", function(done) {
  	var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
  	server
    .put("/me")
    .set("x-access-token", user.token)
    .send({
    	longitude: 42.32,
    	latitude: 2.32,
    })
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP responses
    .end(function(err,res){
      	// HTTP status should be 200
      	helper.commonShould(res);

    	res.body.should.have.property('user');
      	//(res.body.status).should.be.ok;
      	res.body.user.should.be.json;
      	res.body.user._id.should.be.type('string');
      	(res.body.user.password === undefined).should.be.true;

      	res.body.user.lastLocation[0].should.equal(42.32);
      	res.body.user.lastLocation[1].should.equal(2.32);
      	// Error key should be false.
      	//Array length més petit que el límit
        (res.body.error == null).should.equal(true);
        (res.body.errors == null).should.equal(true);
      	done();
    });
  });

  /*it("should delete me",function(done){

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
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
   });*/

});