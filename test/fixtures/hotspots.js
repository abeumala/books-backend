var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('../helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

var businessUser = "businessTestUser";
var businessEmail = "business@testemail.com";
var businessFacebookId = "businessFacebookId";

describe("Bussiness fixtures",function(){

	it("should create some bussiness hotspots",function(done){
	    // calling home page api
	    server
	    .post("/register")
	    .send({username : businessUser, email:businessEmail, facebookId: businessFacebookId})
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP response
	    .end(function(err,res){
	      	for (var i = 0; i < 50000; i++) {
			  	server
			    .post("/hotspots")
			    .set("x-access-token", res.body.token)
			    .send({
			    	name: 'businessHotspotTest'+i,
			    	ssid: 'businessSSIDTest'+i,
			    	password: 'businessPasswordTest'+i,
			    	location: {
			    		coordinates: [2.14 + Math.random() * (0.02 - 0.01) + 0.01, 41.39 + Math.random() * (0.02 - 0.01) + 0.01],
				        street: "c/test",
				        zip: "08012",
				        city: "testcity",
				        country: "testalia"
			    	},
			    	isPublic: true
			    })
			    .expect("Content-type",/json/)
			    .expect(200) // THis is HTTP responses
			    .end(function(err,res){
			    });
			}

	      	done();
	    });
  	});
});