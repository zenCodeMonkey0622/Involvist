// BillsServiceClass.js
// defines the BillsService class

const sharedConfig = require('../../Shared/Config/SharedConfig');
const dataSource = require('../../Shared/RousrData/RousrDataSource');
const config = { databaseType: 'mongodb', 
                 uri: 'mongodb://' + 
                    sharedConfig.get('/rousrApi/congressDataSource/authCreds/user') + 
                    ':' + sharedConfig.get('/rousrApi/congressDataSource/authCreds/password') + 
                    '@' + sharedConfig.get('/rousrApi/congressDataSource/uri') };
const debugUtility = require('../../Shared/Debug/debugUtility');

class BillsServiceClass {

    constructor() {
        this.rousrDataSource = dataSource.create(config);
    }

    queryBills(queryDict, callback) {

        debugUtility.debugLog('bills service query bills start: ' + debugUtility.debugTimeNow());

        this.rousrDataSource.queryBills(queryDict, function(err, bills) {
            
            debugUtility.debugLog('bills service query bills callback start: ' + debugUtility.debugTimeNow());

            if (err) return callback(err, null);
    
            if (bills && bills.length > 0) {
                return callback(null, bills);
            }
        });
    }

    getBillsByName(billName, callback) {

        debugUtility.debugLog('bills service get bills by name for: ' + billName + ' start: ' + debugUtility.debugTimeNow());
        
        this.rousrDataSource.getBillsByName(billName, true, function(err, bills) {
            
            debugUtility.debugLog('bills service get bills by name callback end: ' + debugUtility.debugTimeNow());
            if (err) return callback(err, null);
    
            if (bills != null) {
                return callback(null, bills);
            }
        });
    }

    addTagToBill(billNumber, tag, callback) {

        this.rousrDataSource.tagBill(billNumber, tag, function (err, results) {

            if (err) return callback(err, null);
    
            return callback(null, results);
        });
    }

    untagBill(billNumber, tag, callback) {

        this.rousrDataSource.untagBill(billNumber, tag, function (err, results) {
            
            if (err) return callback(err, null);
    
            return callback(null, results);
        });
    }
}

module.exports = BillsServiceClass;