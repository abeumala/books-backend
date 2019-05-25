var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('./helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

describe("/review unit test",function(){
	
	it("should get all user reviews", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
	  	server
	    .get("/reviews")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	rating: 5,
	    	wifiRating: 5,
	    	comment: 'Test comment review'
	    })
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	// Error key should be false.
	      	//Array length més petit que el límit
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  	});

  	it("should get all hotspot reviews", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
	  	var businessHotspot = JSON.parse(fs.readFileSync('fakeData/businessHotspotData.json', 'utf8'));

	  	server
	    .get("/reviews?hotspotId="+businessHotspot._id)
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	rating: 5,
	    	wifiRating: 5,
	    	comment: 'Test comment review'
	    })
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	helper.commonShould(res);
	      	
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  	});

	it("should update a review", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('fakeData/individualUserData1.json', 'utf8'));
	  	server
	    .get("/reviews")
	    .set("x-access-token", individualUser1.token)
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	server
		    .put("/reviews/"+res.body.reviews[0]._id)
		    .set("x-access-token", individualUser1.token)
		    .send({
		    	rating: 5,
		    	wifiRating: 5,
		    	comment: 'Test comment review'
		    })
		    .expect("Content-type",/json/)
		    .expect(200) // THis is HTTP responses
		    .end(function(err,res){
		      	// HTTP status should be 200
		      	helper.commonShould(res);
		      	
		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);
		      	done();
		    });
	    });

	  	
  	});
});