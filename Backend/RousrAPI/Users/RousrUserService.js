// RousrUserService.js
// Manages Rousr users

const debugUtil = require('../../Shared/Debug/debugUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const dataSource = require('../../Shared/RousrData/RousrDataSource');
const config = { databaseType: 'mongodb', 
                 uri: 'mongodb://' + 
                    sharedConfig.get('/rousrApi/congressDataSource/authCreds/user') + 
                    ':' + sharedConfig.get('/rousrApi/congressDataSource/authCreds/password') + 
                    '@' + sharedConfig.get('/rousrApi/congressDataSource/uri') };
const RousrUser = require('../../Shared/Entities/RousrUser').RousrUser;

/**
* A constructor for defining the RouserUserService
*/
var RousrUserService = function () {
    this.rousrDataSource = dataSource.create(config);
}

/**
* newUser() - called after a new user is created to save the user data to the database
* @param {string} userName - the name of the user
* @param {string} realName - the user's real name
* @param {string} email - the user's email
* @param {string} assignedUid - the user's assigned unique id
* @param {function(err, rsrUser)} callback - the callback
*/
RousrUserService.prototype.registerNewUser = function (userName, realName, email, assignedUid, callback) {

    //Create and save Rousr user to the database
    var newRsrUser = new RousrUser();
    newRsrUser.initialize(userName, realName, email, assignedUid);
    newRsrUser.save(function (err) {
        if (err) {
            debugUtil.debugErrorLog('error registering new rousr user: ' +err);
            return callback(err, null);
        }

        debugUtil.debugLog('Rousr user created: ' + userName);
        return callback(null, newRsrUser);
    });
}

/**
* queryUsers() - Queries the users in the database
* @param {dictionary} queryDictionary - key/value pair 
* @param {function(err, docs)} callback - the callback function
*/
// todo: make this service return error and results via callback
// instead of calling next and placing results in the request object.
// also remove response parameter
RousrUserService.prototype.queryUsers = function (queryDictionary, callback) {
    var queryKeys = Object.keys(rqueryDictionary);
    var schemaKeys = Object.keys(RousrUser.schema.paths);
    var queryDict = {};

    for (var i = 0; i < queryKeys.length; i++) {
        if (schemaKeys.indexOf(queryKeys[i]) !== -1) {
            var queryKey = queryKeys[i];
            var queryValue = req.query[queryKey];            
            //'$' is to search for the exact value.  For example looking for h.r.300 and not every number containing h.r.300, such as h.r.3002
            queryDict[queryKey] = { '$regex': queryValue + '$', '$options': 'i' };
        }
    }
    
    RousrUser.find(queryDict, function (err, docs) {
        if (err) {
            return callback(err, null);
        }
        
        return callback(null, docs);
    });
}

/**
* followBill() - saves a bill the user wants to follow to the database
* @param {string} assignedUid - the user's assigned unique id
* @param {string} billNumber - the bill number the user wants to follow
* @param {function(err, results)} callback - the callback
*/
RousrUserService.prototype.followBill = function (assignedUid, billNumber, callback) {
    console.log('billNumber: ' + billNumber);
    RousrUser.update({ rsrUid: assignedUid }, { $addToSet: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return callback(err, null);
        }

        return callback(null, results);
    });
}

/**
* unfollowBill() - unfollows a bill the user was following
* @param {string} assignedUid - the user's assigned unique id
* @param {string} billNumber - the bill number the user wants to follow
* @param {function(err, results)} callback - the callback
*/
RousrUserService.prototype.unfollowBill = function (assignedUid, billNumber, callback) {

    RousrUser.update({ rsrUid: assignedUid }, { $pull: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return callback(err, null);
        }

        return callback(null, results);
    });
}

module.exports = new RousrUserService();
