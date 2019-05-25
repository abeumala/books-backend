var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('../helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

var businessUser = "businessTestUser";
var businessEmail = "business@testemail.com";
var businessFacebookId = "businessFacebookId";

var individualUser = "individualTestUser";
var individualEmail = "individualEmail";
var individualPass = "individualTestPass";

const BUSERS_COUNT = 2000;
const HOTSPOTS_COUNT = 2000;
const REVIEWS_COUNT = 50;
const IUSERS_COUNT = 10000;

describe("Bussiness fixtures",function(){

	it("should create some bussiness hotspots",function(done){
	    // calling home page api
	    for (var i = 0; i < BUSERS_COUNT; i++) {
		    server
		    .post("/register")
		    .send({username : businessUser+i, email:businessEmail+i, facebookId: businessFacebookId+i})
		    .end(function(err,res){
		      	//for (var j = 0; j < 1; j++) {
		      		if (res) {
			      		var token = res.body.token;
					  	server
					    .post("/hotspots")
					    .set("x-access-token", token)
					    .send({
					    	name: 'businessHotspotTest'+i,
					    	ssid: 'businessSSIDTest'+i,
					    	password: 'businessPasswordTest'+i,
					    	location: {
					    		latitude: 41.39 + (Math.random() * 0.1) + 0.01,
					    		longitude: 2.14 + (Math.random() * 0.1) + 0.01
					    	},
					    	isPublic: true
				    	});
					}
				//}

		      	
		    });
		}
		for (var i = 0; i < IUSERS_COUNT; i++) {
		    server
		    .post("/register")
		    .send({username : individualUser + i, email:individualEmail + i + "@test.com", password: individualPass})
		    .end(function(err,res2){
		      	//for (var j = 0; j < 1; j++) {
		      		if (res2) {
			      		var token = res2.body.token;
					  	server
					    .post("/hotspots")
					    .set("x-access-token", token)
					    .send({
					    	name: 'individualHotspotTest'+i,
					    	ssid: 'individualSSIDTest'+i,
					    	password: 'individualPasswordTest'+i,
					    	isPublic: false
					    });
					}
				//}

		      	
		    });
		}
		//done();
  	});

	/*it("should create some individual hotspots",function(done){
	    // calling home page api
	    for (var i = 0; i < IUSERS_COUNT; i++) {
		    server
		    .post("/register")
		    .send({username : individualUser + i, email:individualEmail + i + "@test.com", password: individualPass})
		    .expect("Content-type",/json/)
		    .expect(200) // THis is HTTP response
		    .end(function(err,res){
		      	for (var j = 0; j < 1; j++) {
				  	server
				    .post("/hotspots")
				    .set("x-access-token", res.body.token)
				    .send({
				    	name: 'individualHotspotTest'+i,
				    	ssid: 'individualSSIDTest'+i,
				    	password: 'individualPasswordTest'+i,
				    	isPublic: false
				    });
				}

		      	
		    });
		}
		//done();
  	});*/
});