"use strict"
var should = require("should");

var TestHelper = function() {};

TestHelper.commonShould = function(res) {
	res.status.should.equal(200);
	res.should.be.json;
	res.body.should.have.property('success');
	res.body.success.should.be.type('boolean');
	res.body.success.should.be.ok;
	res.body.success.should.equal(true);
};

module.exports = TestHelper;