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

describe("Pre test",function(){

	it("should register a new personal user",function(done){
	    // calling home page api
	    server
	    .post("/register")
	    .send({username : individualUser1, password : individualPass1, email:individualEmail1})
	    .expect("Content-type",/json/)
	    //.expect(200) // THis is HTTP response
	    .end(function(err,res){
	    	if (res.status == 200) {
		      	// HTTP status should be 200
		      	helper.commonShould(res);

		      	res.body.user.should.be.json;
		      	res.body.user._id.should.be.type('string');
		      	(res.body.user.password === undefined).should.be.true;

		      	res.body.token.should.not.equal(null);
		      	res.body.token.should.not.equal(undefined);
		      	res.body.token.should.be.type('string');
		      	
		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);

		      	var individualFileContent = JSON.stringify(
		      		{
		      			_id: res.body.user._id, 
		      			username: individualUser1, 
		      			password: individualPass1,
		      			email: individualEmail1,
		      			token: res.body.token
		      		});


				fs.writeFile('test/fakeData/individualUserData1.json', individualFileContent, function (err) {
				  if (err) return console.log(err);
				  //console.log('fakeData/userData.json > '+JSON.stringify(fileContent));
				});
			}
	      	done();
	    });
  	});

	it("should register another personal user",function(done){
	    // calling home page api
	    server
	    .post("/register")
	    .send({username : individualUser2, password : individualPass2, email:individualEmail2})
	    .expect("Content-type",/json/)
	    //.expect(200) // THis is HTTP response
	    .end(function(err,res){
	    	if (res.status == 200) {
		      	// HTTP status should be 200
		      	helper.commonShould(res);
		      	//(res.body.status).should.be.ok;
		      	res.body.user.should.be.json;
		      	res.body.user._id.should.be.type('string');
		      	(res.body.user.password === undefined).should.be.true;

		      	res.body.token.should.not.equal(null);
		      	res.body.token.should.not.equal(undefined);
		      	res.body.token.should.be.type('string');
		      	
		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);

		      	var individualFileContent = JSON.stringify(
		      		{
		      			_id: res.body.user._id, 
		      			username: individualUser2, 
		      			password: individualPass2,
		      			email: individualEmail2,
		      			token: res.body.token
		      		});


				fs.writeFile('test/fakeData/individualUserData2.json', individualFileContent, function (err) {
				  if (err) return console.log(err);
				  //console.log('fakeData/userData.json > '+JSON.stringify(fileContent));
				});
			}
	      	done();
	    });
  	});

	it("should register a new business user",function(done){
	    // calling home page api
	    server
	    .post("/register")
	    .send({username : businessUser, email:businessEmail, facebookId: businessFacebookId})
	    .expect("Content-type",/json/)
	    //.expect(200) // THis is HTTP response
	    .end(function(err,res){
	    	if (res.status == 200) {
		      	// HTTP status should be 200
		      	helper.commonShould(res);
		      	//(res.body.success).should.be.ok;
		      	res.body.user.should.be.json;
		      	res.body.user._id.should.be.type('string');
		      	(res.body.user.password === undefined).should.be.true;

		      	res.body.token.should.not.equal(null);
		      	res.body.token.should.not.equal(undefined);
		      	res.body.token.should.be.type('string');
		      	
		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);

		      	var businessFileContent = JSON.stringify(
		      		{
		      			_id: res.body.user._id, 
		      			username: businessUser,
		      			email: businessEmail,
		      			facebookId: businessFacebookId,
		      			token: res.body.token
		      		});

				fs.writeFile('test/fakeData/businessUserData.json', businessFileContent, function (err) {
				  if (err) return console.log(err);
				  //console.log('fakeData/userData.json > '+JSON.stringify(fileContent));
				});
	      	}
	      	done();
	    });
  	});

	it("should create a personal hotspot", function(done) {
	  	var user = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	server
	    .post("/hotspots")
	    .set("x-access-token", user.token)
	    .send({
	    	name: 'individualHotspotTest',
	    	ssid: 'individualSSIDTest',
	    	password: 'individualPasswordTest'
	    })
	    .expect("Content-type",/json/)
	    //.expect(200) // THis is HTTP responses
	    .end(function(err,res){
	    	if (res.status == 200) {
		      	// HTTP status should be 200
		      	helper.commonShould(res);
		      	
		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);

		      	var fileContent = JSON.stringify(
		      		{
		      			_id: res.body.hotspot._id,
		      			slug: res.body.hotspot.slug,
		      			owners: res.body.hotspot.owners, 
		      		});

		      	fs.writeFile('test/fakeData/individualHotspotData.json', fileContent, function (err) {
				  if (err) return console.log(err);
				  //console.log('fakeData/postData.json > '+JSON.stringify(fileContent));
				});
	      	}
	      	done();
	    });
  	});

	it("should create a business hotspot", function(done) {
	  	var user = JSON.parse(fs.readFileSync('test/fakeData/businessUserData.json', 'utf8'));
	  	server
	    .post("/hotspots")
	    .set("x-access-token", user.token)
	    .send({
	    	name: 'businessHotspotTest',
	    	ssid: 'businessSSIDTest',
	    	password: 'businessPasswordTest',
	    	isPublic: true
	    })
	    .expect("Content-type",/json/)
	    //.expect(200) // THis is HTTP responses
	    .end(function(err,res){
	    	if (res.status == 200) {
		      	// HTTP status should be 200
		      	helper.commonShould(res);

		      	// Error key should be false.
		      	(res.body.error == null).should.equal(true);
		      	(res.body.errors == null).should.equal(true);

		      	var fileContent = JSON.stringify(
		      		{
		      			_id: res.body.hotspot._id,
		      			slug: res.body.hotspot.slug,
		      			owners: res.body.hotspot.owners, 
		      		});

		      	fs.writeFile('test/fakeData/businessHotspotData.json', fileContent, function (err) {
				  if (err) return console.log(err);
				  //console.log('fakeData/postData.json > '+JSON.stringify(fileContent));
				});
		    }
	      	done();
	    });
  	});

});