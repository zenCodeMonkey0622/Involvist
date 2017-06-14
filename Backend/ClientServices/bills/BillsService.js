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
