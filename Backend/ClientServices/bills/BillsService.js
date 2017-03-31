// BillsService.js
// The service to get bills from the database
var config = require('./config');
var databaseFactory = require('../../Common/databaseService').DatabaseFactory;

/**
* A constructor for defining BillsService
*/
var BillsService = function() {	
	this.database = databaseFactory.createDatabase(config);	
}

/**
* queryBills() - Queries the bills in the database
* @param <object> req - request - req.query.q will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call 
* @param <string> filterParam - example 'number'
*/
BillsService.prototype.queryBills = function (req, res, next, filterParam) {
	var queryValue = req.query.q;	
	var query = {};
	query[filterParam] =  {'$regex': queryValue, '$options': 'i'};	
	this.database.queryBills(query, function(err, docs){
		if(err) {
			console.log('In database.queryBills, sort of ' + err);
			return next (err);
		}
		
		if(docs && docs.length > 0) {
			if(req.bills && req.bills.length > 0) {				
				req.bills = req.bills.concat(docs);				
			}
			else {
				req.bills = docs;
			}
		}
		return next();
	});
}

/**
* getBillByNumber() - Queries the bills in the database
* @param <object> req - request
* @param <object> res - response
* @param <function()> next - the next function to call 
*/
BillsService.prototype.getBillByNumber = function (req, res, next) {
	this.queryBills(req, res, next, 'number');		
}

/**
* getBillsBySponsorId() - Queries the bills in the database
* @param <object> req - request
* @param <object> res - response
* @param <function()> next - the next function to call 
*/
BillsService.prototype.getBillsBySponsorId = function (req, res, next) {
	this.queryBills(req, res, next, 'sponsor_id');	
}	

/**
* getBillsByTitle() - Queries the bills in the database
* @param <object> req - request
* @param <object> res - response
* @param <function()> next - the next function to call 
*/
BillsService.prototype.getBillsByTitle = function (req, res, next) {
	this.queryBills(req, res, next, 'title');
}

/**
* getBillsByPrimarySubject() - Queries the bills in the database
* @param <object> req - request
* @param <object> res - response
* @param <function()> next - the next function to call 
*/
BillsService.prototype.getBillsByPrimarySubject = function (req, res, next) {
	this.queryBills(req, res, next, 'primary_subject');	
}

module.exports = new BillsService();

