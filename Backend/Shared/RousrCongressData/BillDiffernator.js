// BillDiffernator.js
// responsible for finding the differences in a bill and updating the BillUpdates table as necessary

'use strict';
const sharedConfig = require('../Config/SharedConfig');
const Bill = require('../Models/bill').Bill;
const BillUpdates = require('../Models/BillUpdates').BillUpdates;

var BillDiffernator = (function () {
    module.exports.BillDiffernator = new BillDiffernator;
       
    function BillDiffernator() {
        this.billsCache = null;
    }

    /*
    *   loadBillsCache - Get all the bills and store them in an array to avoid database calls.
    *   @param <function()> callback - callback function
    */
    BillDiffernator.prototype.loadBillsCache = function (callback) {
        try {
            var self = this;
            var findQuery = Bill.find();
            findQuery.where({});
            findQuery.select({
                number: 1,
                latest_major_action_date: 1,
                latest_major_action: 1,
                actions: 1,
                last_vote_date: 1,
                house_passage: 1,
                senate_passage: 1               
            });

            findQuery.exec(function (err, docs) {
                if (!err && docs && docs.length > 0) {
                    self.billsCache = docs;
                    console.log('Cache size: ' + self.billsCache.length);
                }
                else {
                    console.log('No bill data or an error occured :(');
                }
                callback();
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /*
    *   hasBillLatestActionChanged - Checks if the latest action date has changed
    *   @param newBillData - the new bill data
    *   @param <function()> callback - callback function
    */
    BillDiffernator.prototype.hasBillLatestActionChanged = function (newBillData, callback) {
        this.getBill(newBillData.number, true, function (oldBillData) {
            if (oldBillData) {
                if (oldBillData.latest_major_action_date !== newBillData.latest_major_action_date) {
                    return callback(true);
                }
                else {
                    return callback(false);
                }
            }
            else {
                return callback(true);
            }
        });
    }

    /*
    *   onBillUpdated - When a bill is updated checks to see if there are any changes that needed to be recorded in the BillUpdates table.
    *   @param newBillData - the new bill data
    *   @param callback - callback function
    */
    BillDiffernator.prototype.onBillUpdated = function(newBillData, callback){
        var self = this;
        var updatedBillData = null;
        if (newBillData) {
            this.getBill(newBillData.number, true, function (oldBillData) {                
                if (oldBillData) {
                    var updatedBillData = self.diffBills(oldBillData, newBillData);
                    if (updatedBillData !== null && Object.keys(updatedBillData).length !== 0) {
                        updatedBillData.number = newBillData.number;
                        var now = new Date();
                        updatedBillData.time_stamp = now.toUTCString();
                        return callback(updatedBillData);
                    }
                    else {
                        callback(null);
                    }
                }
                else { //If no old data than must be a new bill
                    updatedBillData = {
                        number: newBillData.number,
                        house_passage: newBillData.house_passage,
                        latest_major_action_date: newBillData.latest_major_action_date,
                        latest_major_action: newBillData.latest_major_action,
                        actions: newBillData.actions,
                        last_vote_date: newBillData.last_vote_date,
                        senate_passage: newBillData.senate_passage                        
                    };
                    return callback(updatedBillData);
                }
            });            
        }    
    }

    /*
    *   getBill - Gets the bill either from the cache or the database
    *   @param number - the bill number of the bill to find
    *   @param fromCache - If true then look for the bill in the cache.  If false go to the database to find the bill
    *   @param callback - callback function
    */
    BillDiffernator.prototype.getBill = function(number, fromCache, callback) {
        var self = this;
        if (fromCache && self.billsCache !== null) {
            var bill = self.billsCache.filter(function (item) {
                return item.number === number;                    
            });            

            if (bill && bill.length > 0) {
                return callback(bill[0]);
            }
            else {
                return callback(null);
            }
        }
        else {
            try {               
                var findQuery = Bill.find();
                findQuery.where({ number: number });
                findQuery.select({
                    number: 1,
                    latest_major_action_date: 1,
                    latest_major_action: 1,
                    actions: 1,
                    last_vote_date: 1,
                    house_passage: 1,
                    senate_passage: 1                    
                });

                findQuery.exec(function (err, docs) {
                    if (!err && docs && docs.length > 0) {
                        return callback(docs[0])
                    }
                    else {
                        return callback(null);
                    }
                });
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    /*
    *   diffBills - Compares the old bill data to the new data to see if there are any differences
    *   @param oldBillData - the old bill data
    *   @param newBillData - the new bill data
    */
    BillDiffernator.prototype.diffBills = function (oldBillData, newBillData) {
        if (oldBillData === null || newBillData === null) {
            return null;
        }

        var updatedBillData = {};

        if (oldBillData.house_passage !== newBillData.house_passage) {            
            updatedBillData.house_passage = newBillData.house_passage;
        }
        if (oldBillData.senate_passage !== newBillData.senate_passage) {            
            updatedBillData.senate_passage = newBillData.senate_passage;
        }
        if (oldBillData.latest_major_action_date !== newBillData.latest_major_action_date) {
            updatedBillData.latest_major_action_date = newBillData.latest_major_action_date;
        }
        if (oldBillData.latest_major_action !== newBillData.latest_major_action) {
            updatedBillData.latest_major_action = newBillData.latest_major_action;
        }
        if (oldBillData.last_vote_date !== newBillData.last_vote_date) {
            updatedBillData.last_vote_date = newBillData.last_vote_date;
        }

        if (oldBillData.actions !== null && newBillData.actions !== null && oldBillData.actions.length !== newBillData.actions.length) {
            updatedBillData.actions = newBillData.actions;
        }
        
        return updatedBillData;
    }        

   /*
   *   addBillUpdates - Adds the bill changes to the BillUpdates table.
   *   @param billData - the bill changes
   */
    BillDiffernator.prototype.addBillUpdates = function (billData) {
        //Update the BillUpdates collection
        BillUpdates.update(
           { number: billData.number },
           { $set: billData },
           { upsert: true },
           function (err, raw) {
               if (err) {
                   return next(err);
               }
           }
       );
    }

})();