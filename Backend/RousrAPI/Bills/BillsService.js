// BillsService.js
const sharedConfig = require('../../Shared/Config/SharedConfig');
const dataSource = require('../../Shared/RousrData/RousrDataSource');
const config = { databaseType: 'mongodb', 
                 uri: 'mongodb://' + 
                    sharedConfig.get('/rousrApi/congressDataSource/authCreds/user') + 
                    ':' + sharedConfig.get('/rousrApi/congressDataSource/authCreds/password') + 
                    '@' + sharedConfig.get('/rousrApi/congressDataSource/uri') };
const debugUtility = require('../../Shared/Debug/debugUtility');

/**
* A constructor for defining BillsService
*/
var BillsService = function() {
	this.rousrDataSource = dataSource.create(config);
}

/**
* queryBills() - Queries the bills in the database
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
*/
BillsService.prototype.queryBills = function (req, res, next) 
{
    debugUtility.debugLog('bills service query bills start: ' + debugUtility.debugTimeNow());

    this.rousrDataSource.queryBills(req.query, function (err, docs) {
        debugUtility.debugLog('bills service query bills callback start: ' + debugUtility.debugTimeNow());
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
* getBillsByName() - Gets bills by name
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
*/
BillsService.prototype.getBillsByName = function (req, res, next) {
    debugUtility.debugLog('bills service get bills by name for: ' + req.query.name + ' start: ' + debugUtility.debugTimeNow());

    this.rousrDataSource.getBillsByName(req.query.name, function (err, docs) {
        debugUtility.debugLog('bills service get bills by name callback end: ' + debugUtility.debugTimeNow());
        if (err) {
            return next(err);
        }

        if (docs && docs.length > 0) {
            if (req.bills && req.bills.length > 0) {
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

    this.rousrDataSource.tagBill(billNumber, tag, function (err, results) {
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

    this.rousrDataSource.untagBill(billNumber, tag, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(err, results);
    });
}

module.exports = new BillsService();
