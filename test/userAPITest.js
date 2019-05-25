var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var config = require('../config/config');
var helper = require('./helpers/testHelper');
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

// UNIT test begin

describe("/users unit test",function(){

  it("should return users list",function(done){
  	var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
    // calling houser page api
	  server
	    .get("/users")
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);

    		/*res.body.success.should.be.ok;
        	res.body.should.have.property('users');
        	res.body.posts.length.should.be.lessThan(config.POST_ITEMS_X_PAGE_LIMIT + 1);*/
	      	// Error key should be false.
	      	//Array length més petit que el límit
	        (res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  });

  it("should return users list by search query",function(done){
  	var user = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
    // calling houser page api
	  server
	    .get("/users?q="+'HERN')
	    .set("x-access-token", user.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	console.log(res.body);
    		/*res.body.success.should.be.ok;
        	res.body.should.have.property('users');
        	res.body.posts.length.should.be.lessThan(config.POST_ITEMS_X_PAGE_LIMIT + 1);*/
	      	// Error key should be false.
	      	//Array length més petit que el límit
	        (res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  });

  it("should return a user",function(done){
  	var user1 = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
  	var user2 = JSON.parse(fs.readFileSync('fakeData/individualUserData2.json', 'utf8'));
    // calling houser page api
	  server
	    .get("/users/"+user2._id)
	    .set("x-access-token", user1.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);

        	res.body.should.have.property('user');
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

  /*it("should return unauthorized",function(done){
    server
    .get("/users")
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
  });*/
});