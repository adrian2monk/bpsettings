'use strict';

var _ = require('lodash');
var app = require('../server/app');

describe('Conekta API', function() {

    var userStub = function(fields) {
	var props = fields || _.values(arguments);
	var user = {
	    name:"James Howlett",
	    email:"james.howlett@forces.gov",
	    phone:"55-5555-5555",
	    cards:["tok_8kZwafM8IcN23Nd9"],
	    plan:"gold-plan"
	};
	if (props.length === 0) {
	    return user;
	}
	return _.pick(user, fields);
    };
    
    describe('User Registration', function() {
	// Given: User account information (name*, email*, phone, cards, plan, billing_address, shipping_address)
	// When: email is empty
	// Then ->
	it('Should fail when registering new user do to lack of information on client payload', function(done) {
	    request(app)
		.post('/user/setup')
		.body(userStub('name', 'phone'))
		.expect(400, done);
	});
	// Given: User account information
	// When: all info is correct
	// Then ->
	it('Should register a new user on its platform', function(done) {
	    request(app)
		.post('/user/setup')
		.body(userStub())
		.expect(201, done);
	});
	// Given: User account information
	// When: user info send again
	// Then ->
	it('Should fail when registering a new user by duplication', function(done) {
	    request(app)
		.post('/user/setup')
		.body(userStub())
		.expect(304, done);
	});
    });

    describe('Card Managment', function() {
	it('Should fail when trying to insert a new card object with some missing fields', function() {});
	it('Should add a new card object to a resently created client', function() {});
	it('Should delete a given card from client\'s cards list', function() {});
	it('Should return not found card when request for delete a not inserted card from client', function() {});
	it('Should update the card information on a client object specified', function() {});
	it('Should return a listing of card objects for the specified client', function() {});
    });

    describe('Plan Managment', function() {
	it('Should fail when plan information with empty required fields try to be added', function() {});
	it('Should success add a new plan to platform', function() {});
	it('Should update information for an specified plan object', function() {});
	it('Should delete an specified plan form platform', function() {});
	it('Should fail when trying to add a not found plan to an specified client', function() {});
	it('Should add new payment plan to client', function() {});
	it('Should remove payment plan from client', function() {});
    });

    describe('Payments with Credit Card', function() {
	it('Should add a new charge to client', function() {});
	it('Should retrive the information related with a charge requested', function() {});	
    });
});
