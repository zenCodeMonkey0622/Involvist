// RousrUserService.js
// Manages Rousr users

const debugUtil = require('../../Shared/Debug/debugUtility');
const constants = require('../../Shared/SharedConstants');
const databaseFactory = require('../../Shared/RousrCongressData/CongressDataLocalService').DatabaseFactory;
const config = { databaseType: 'mongodb', uri: constants.CONGRESS_DATA_SOURCE };
const RousrUser = require('../../Shared/Models/RousrUser').RousrUser;

/**
* A constructor for defining the RouserUserService
*/
var RousrUserService = function () {
    //TODO - initialization
}

/**
* newUser() - called after a new user is created to save the user data to the database
* @param <object> userName - the name of the user
* @param <object> realName - the user's real name
* @param <object> email - the user's email
* @param <function()> next - the next function to call
*/
RousrUserService.prototype.registerNewUser = function (userName, realName, email, userID, next) {
    //Create and save Involvist user to the database
    var user = new RousrUser();
    user.initialize(userName, realName, email, userID);
    user.save(function (err) {
        if (err) {
            return callback(err);
        }

        debugUtil.debugLog('Involvist User saved: ' + userName);
        return next();
    });
}

/**
* queryUsers() - Queries the users in the database
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
*/
RousrUserService.prototype.queryUsers = function (req, res, next) {
    var keys = Object.keys(req.query);
    var userKeys = Object.keys(RousrUser.schema.paths);
    var query = {};

    for (var i = 0; i < keys.length; i++) {
        if (userKeys.indexOf(keys[i]) !== -1) {
            var filterParam = keys[i];
            var queryValue = req.query[filterParam];            
            //'$' is to search for the exact value.  For example looking for h.r.300 and not every number containing h.r.300, such as h.r.3002
            query[filterParam] = { '$regex': queryValue + '$', '$options': 'i' };
        }
    }
    
    RousrUser.find(query, function (err, docs) {
        if (err) {
            return next(err);
        }
        req.users = docs;
        return next();
    });
}

/**
* followBill() - saves a bill the user wants to follow to the database
* @param <object> userID - the ID of the user
* @param <object> billNumber - the bill number the user wants to follow
* @param <function()> next - the next function to call
*/
RousrUserService.prototype.followBill = function (userID, billNumber, next) {

    RousrUser.update({ userID: userID }, { $addToSet: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}

/**
* unfollowBill() - unfollows a bill the user was following
* @param <object> userID - the ID of the user
* @param <object> billNumber - the bill number the user wants to unfollow
* @param <function()> next - the next function to call
*/
RousrUserService.prototype.unfollowBill = function (userID, billNumber, next) {

    RousrUser.update({ userID: userID }, { $pull: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}

module.exports = new RousrUserService();
