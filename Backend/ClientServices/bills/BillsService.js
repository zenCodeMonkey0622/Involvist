// BillsService.js
var constants = require('../../Shared/SharedConstants');
var databaseFactory = require('../../Shared/CongressDataClient/CongressDataLocalService').DatabaseFactory;
var config = { databaseType: 'mongodb', uri: constants.CONGRESS_DATA_SOURCE };

/**
* A constructor for defining BillsService
*/
var BillsService = function() {
	this.database = databaseFactory.createDatabase(config);
}

/**
* queryBills() - Queries the bills in the database
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
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
