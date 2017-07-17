// BillsService.js
const constants = require('../../Shared/SharedConstants');
const databaseService = require('../../Shared/RousrCongressData/RousrCongressDataService').RousrCongressDataService;
const config = { databaseType: 'mongodb', uri: constants.CONGRESS_DATA_SOURCE };
const debugUtility = require('../../Shared/Debug/debugUtility');

/**
* A constructor for defining BillsService
*/
var BillsService = function() {
	this.database = databaseService.createDatabase(config);
}

/**
* queryBills() - Queries the bills in the database
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
*/
BillsService.prototype.queryBills = function (req, res, next) 
{
    debugUtil.debugLog('bills service query bills start: ' + debugUtility.debugTimeNow());

    this.database.queryBills(req.query, function (err, docs) {
        debugUtil.debugLog('bills service query bills callback start: ' + debugUtility.debugTimeNow());
		if(err) 
        {
			return next (err);
		}

		if(docs && docs.length > 0) 
        {
			if(req.bills && req.bills.length > 0) 
            {
				req.bills = req.bills.concat(docs);
			}
			else 
            {
				req.bills = docs;
			}
		}
		return next();
	});
}

/**
* addTagToBill() - adds a tag to the bill
* @param <object> billNumber - the bill number of the bill to tag
* @param <object> tag - the tag to add to the bill
* @param <function()> next - the next function to call
*/
BillsService.prototype.addTagToBill = function (billNumber, tag, next) {

    this.database.tagBill(billNumber, tag, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(err, results);
    });
}

/**
* untagBill() - removes a tag from the bill
* @param <object> billNumber - the bill number of the bill to untag
* @param <object> tag - the tag to remove from the bill
* @param <function()> next - the next function to call
*/
BillsService.prototype.untagBill = function (billNumber, tag, next) {

    this.database.untagBill(billNumber, tag, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(err, results);
    });
}

module.exports = new BillsService();
