// InvolvistUserService.js
var constants = require('../../Shared/SharedConstants');
var databaseFactory = require('../../Shared/CongressDataClient/CongressDataLocalService').DatabaseFactory;
var config = { databaseType: 'mongodb', uri: constants.CONGRESS_DATA_SOURCE };
var InvolvistUser = require('../../Shared/Models/user').InvolvistUser;

/**
* A constructor for defining InvolvistUserService
*/
var InvolvistUserService = function () {
    //TODO - initialization
}

/**
* newUser() - called after a new user is created to save the user data to the database
* @param <object> userName - the name of the user
* @param <object> realName - the user's real name
* @param <object> email - the user's email
* @param <function()> next - the next function to call
*/
InvolvistUserService.prototype.newUser = function (userName, realName, email, next) {
    //Create and save Involvist user to the database
    var user = new InvolvistUser();
    user.initialize(userName, realName, email);
    user.save(function (err) {
        if (err) {
            return callback(err);
        }

        console.log('Involvist User saved: ' + userName);
        return next();
    });
}

/**
* followBill() - saves a bill the user wants to follow to the database
* @param <object> userName - the name of the user
* @param <object> billNumber - the bill number the user wants to follow
* @param <function()> next - the next function to call
*/
InvolvistUserService.prototype.followBill = function (userName, billNumber, next) {

    InvolvistUser.update({ userName: userName }, { $addToSet: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}

/**
* unfollowBill() - unfollows a bill the user was following
* @param <object> userName - the name of the user
* @param <object> billNumber - the bill number the user wants to unfollow
* @param <function()> next - the next function to call
*/
InvolvistUserService.prototype.unfollowBill = function (userName, billNumber, next) {

    InvolvistUser.update({ userName: userName }, { $pull: { followingBills: billNumber } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}

/**
* queryUsers() - Queries the users in the database
* @param <object> req - request - req.query will contain the value to query for
* @param <object> res - response
* @param <function()> next - the next function to call
*/
InvolvistUserService.prototype.queryUsers = function (req, res, next) {
    var keys = Object.keys(req.query);
    var userKeys = Object.keys(InvolvistUser.schema.paths);
    var query = {};

    for (var i = 0; i < keys.length; i++) {
        if (userKeys.indexOf(keys[i]) !== -1) {
            var filterParam = keys[i];
            var queryValue = req.query[filterParam];            
            //'$' is to search for the exact value.  For example looking for h.r.300 and not every number containing h.r.300, such as h.r.3002
            query[filterParam] = { '$regex': queryValue + '$', '$options': 'i' };
        }
    }
    
    InvolvistUser.find(query, function (err, docs) {
        if (err) {
            return next(err);
        }
        req.users = docs;
        return next();
    });
}

module.exports = new InvolvistUserService();
