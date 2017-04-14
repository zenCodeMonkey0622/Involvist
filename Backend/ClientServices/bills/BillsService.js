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
BillsService.prototype.queryBills = function (req, res, next) {   
    this.database.queryBills(req.query, function (err, docs) {
		if(err) {			
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

module.exports = new BillsService();

