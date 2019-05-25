var supertest = require("supertest");
var should = require("should");
var fs = require('fs');
var helper = require('../helpers/testHelper');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000/api");

describe("/hotspots unit test",function(){

	/*it("should create a hotspot", function(done) {
	  	var user = JSON.parse(fs.readFileSync('test/fakeData/userData.json', 'utf8'));
	  	server
	    .post("/hotspots")
	    .set("x-access-token", user.token)
	    .send({
	    	name: 'HotspotTest1',
	    	ssid: 'SSIDTest1',
	    	password: 'passwordTest1'
	    })
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	(res.status).should.equal(200);
	      	// Error key should be false.
	      	//Array length més petit que el límit
	      	(res.body.error == null).should.equal(true);
	      	done();
	    });
  	});*/
	it("should get all public hotspots", function(done) {
	  	
	  	server
	    .get("/hotspots")
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	helper.commonShould(res);
	      	
	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  	});

  	it("should get all public hotspots by location", function(done) {
	  	
	  	server
	    .get("/hotspots?lat=42.1212&lon=2.15")
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

  	it("should get private personal hotspots", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));

	  	server
	    .get("/me/hotspots?type=friends")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	customer: individualUser1._id
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

  	it("should get my private friends hotspots", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));

	  	server
	    .get("/me/hotspots?type=friends")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	customer: individualUser1._id
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

  	it("should get my private business hotspots", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));

	  	server
	    .get("/me/hotspots?type=friends")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	customer: individualUser1._id
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

	it("should connect indivudual user to a business hotspot", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	var businessHotspot = JSON.parse(fs.readFileSync('test/fakeData/businessHotspotData.json', 'utf8'));
	  	
	  	server
	    .put("/hotspots/"+businessHotspot._id+"/connect")
	    .set("x-access-token", individualUser1.token)
	    /*.send({
	    	customer: individualUser1._id
	    })*/
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

	it("should not allow to invite from non owner hotspot", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	var individualUser2 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData2.json', 'utf8'));
	  	var individualHotspot = JSON.parse(fs.readFileSync('test/fakeData/individualHotspotData.json', 'utf8'));
	  	
	  	server
	    .put("/hotspots/"+individualHotspot._id+"/invite")
	    .set("x-access-token", individualUser2.token)
	    .send({
	    	customer: individualUser2._id
	    })
	    .expect("Content-type",/json/)
	    .expect(200) // THis is HTTP responses
	    .end(function(err,res){
	      	// HTTP status should be 200
	      	(res.status).should.equal(403);
	      	res.should.be.json;
    		res.body.should.have.property('success');
    		res.body.success.should.be.type('boolean');
	      	res.body.success.should.be.not.ok;
	      	res.body.success.should.equal(false);

	      	// Error key should be false.
	      	(res.body.error == null).should.equal(true);
	      	(res.body.errors == null).should.equal(true);
	      	done();
	    });
  	});

  	it("should invite indivudual user to connect to individual hotspot", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	var individualUser2 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData2.json', 'utf8'));
	  	var individualHotspot = JSON.parse(fs.readFileSync('test/fakeData/individualHotspotData.json', 'utf8'));
	  	
	  	server
	    .put("/hotspots/"+individualHotspot._id+"/invite")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	customer: individualUser2._id
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

  	it("should return owner hotspots count", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	
	  	server
	    .get("/me/hotspots/count?type=owners")
	    .set("x-access-token", individualUser1.token)
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

  	it("should return customers hotspots count", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	
	  	server
	    .get("/me/hotspots/count?type=customers")
	    .set("x-access-token", individualUser1.token)
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

  	it("should exclude indivudual user to connect to individual hotspot", function(done) {
	  	var individualUser1 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData1.json', 'utf8'));
	  	var individualUser2 = JSON.parse(fs.readFileSync('test/fakeData/individualUserData2.json', 'utf8'));
	  	var individualHotspot = JSON.parse(fs.readFileSync('test/fakeData/individualHotspotData.json', 'utf8'));
	  	
	  	server
	    .put("/hotspots/"+individualHotspot._id+"/invite")
	    .set("x-access-token", individualUser1.token)
	    .send({
	    	customer: individualUser2._id
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