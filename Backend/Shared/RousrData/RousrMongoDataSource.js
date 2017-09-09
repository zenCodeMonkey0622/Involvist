// RousrMongoDatasource.js
// mongoDb implementation of the rousr data source

'use strict';

module.exports = RousrMongoDataSource;

const mongoose = require('mongoose');
const debugUtil = require('../../Shared/Debug/debugUtility');
const stringParser = require('../../Shared/Parsers/stringParse');
const CongressMember = require('../Entities/CongressMember').CongressMember;
const Bill = require('../Entities/Bill').Bill;

/**
* A constructor for defining new mongoDb database service
*/
function RousrMongoDataSource(options) {

    // note: if multiple instances of this class are instantiate
    // the connect call will throw an error trying to open unclosed
    // connection. despite this the connection still works. need to figure
    // out how to create an instance-based property for the db var.
    mongoose.connect(options.uri);
    var db = mongoose.connection;

    db.on('error', function(err) {
        debugUtil.debugErrorLog('RousrMongoDataSource connection error: ' + err.message);
    });

    db.once('open', function(){
        debugUtil.debugLog('RousrMongoDataSource DB connection: ' + options.uri + ' successful');
    });
}

/**
* UpdateMembers() - Updates members in the congressMembers collection
* @param <[{CongressMember}]> data
* @param <function()> next
*/
RousrMongoDataSource.prototype.updateMembers = function (data, callback) {
	data.forEach(function(memberData) {
			CongressMember.update(
				{ id: memberData.id},
				{ $set: memberData },
				{ upsert: true},
				function (err, raw) {
					if (err){
					  	return callback(err);
					}
				}
			);
	});

	callback();
}

/**
* QueryMembers() - Queries the congressMembers collection
* @param <object> query - example {id: memberId}
* @param <function()> callback
*/
RousrMongoDataSource.prototype.queryMembers = function (query, callback) {
    CongressMember.find(query, function(err, docs){
        if(err){
            return callback(err);
        }
        callback(null, docs);
    });
}

/**
* UpdateBills() - Updates bills in the bills collection
* @param <[{Bill}]> array of Bill objects
* @param <function()> next
*/
RousrMongoDataSource.prototype.updateBills = function (billsToUpdate, next) {
    billsToUpdate.forEach(function(billData) {

        // parse the primary_subject string into components and
        // set the added rsr_primary_subjects array
        billData.rsr_primary_subjects = stringParser.parsePrimarySubjects(billData.primary_subject);

        Bill.update(
			{ number: billData.number},
			{ $set: billData },
			{ upsert: true},
			function (err, raw) {
			    if (err){
			        return next(err);
			    }
			}
		);
    });

    next();
}

/**
* QueryBills() - Queries the bills collection.
* @param <object> reqQuery - example {number: billNum}. If 'q' is one of the parameters then its string value
* will be looked for in the number, title, primary_subject, and description.  If there are other query params,
* they will be AND with the 'q' results
* @param <function()> callback
*/
RousrMongoDataSource.prototype.queryBills = function (reqQuery, callback) {
    var keys = Object.keys(reqQuery);
    var billKeys = Object.keys(Bill.schema.paths);
    var query = {};

    // by default we use regex
    var useRegex = true;

    // if the 'exact' parameter is passed, set the useRegex
    // based on the value
    if (keys.indexOf('exact') >= 0) {
        useRegex = !reqQuery.exact
    }

    for (var i = 0; i < keys.length; i++) {
        if (billKeys.indexOf(keys[i]) !== -1) {
            var filterParam = keys[i];
            var queryValue = reqQuery[filterParam];
            // if using regex, search is not the exact value.  For example looking for h.r.300 and not every number containing h.r.300, such as h.r.3002
            // otherwise, just use an exact match
            query[filterParam] = useRegex ? { '$regex': queryValue, '$options': 'i' } : queryValue;
        }
    }

    if (keys.indexOf('q') >= 0) {
        query = {
            $and: [
                {
                    $or: [{ 'number': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q },
                            { 'title': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q },
                            { 'primary_subject': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q },
                            { 'description': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q },
                            { 'summary': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q },
                            { 'tags': useRegex ? { '$regex': reqQuery.q, '$options': 'i' } : reqQuery.q }
                    ]
                },
                query
            ]
        }
    }

    var findQuery = Bill.find();
    findQuery.where(query);
    findQuery.select({
        number: 1,
        rsr_name: 1,
        bill_uri: 1,
        title: 1,
        sponsor_id: 1,
        sponsor_uri: 1,
        gpo_pdf_uri: 1,
        congressdotgov_url: 1,
        govtrack_url: 1,
        introduced_date: 1,
        active: 1,
        primary_subject: 1,
        summary: 1,
        latest_major_action_date: 1,
        latest_major_action: 1
    });

    findQuery.exec(function (err, docs) {
        if (err) {
            return callback(err);
        }

        debugUtil.debugLog('queryBills found ' + docs.length + ' results');
        callback(null, docs);
    });
}

/**
* getBillsByName() - Queries the bills collection by name.
* @param {string} name - has a name field, which will be alphanumeric, and an optional exact field
* @param {function()} callback
*/
RousrMongoDataSource.prototype.getBillsByName = function (name, exact, callback) {

    var findQuery = Bill.find();
    findQuery.where({ 'rsr_name': exact ? name.toLowerCase() : { '$regex': name.toLowerCase() } });
    findQuery.select({
        number: 1,
        rsr_name: 1,
        bill_uri: 1,
        title: 1,
        sponsor_id: 1,
        sponsor_uri: 1,
        gpo_pdf_uri: 1,
        congressdotgov_url: 1,
        govtrack_url: 1,
        introduced_date: 1,
        active: 1,
        primary_subject: 1,
        summary: 1,
        latest_major_action_date: 1,
        latest_major_action: 1
    });

    findQuery.exec(function (err, res) {
        if (err) return callback(err, null);

        debugUtil.debugLog('getBillsByName found ' + res.length + ' results');

        callback(null, res);
    });
}

/**
* tagBill() - Tag bill
* @param numbber billNumber - number of bill to tag
* @param string tag - tag for bill
* @param <function()> next
*/
RousrMongoDataSource.prototype.tagBill = function (billNumber, tag, callback) {
    Bill.update({ number: billNumber }, { $addToSet: { tags: tag } }, function (err, results) {
        if (err) {
            console.error(err);
            return callback(err);
        }
        return callback(null, results);
    });
}

/**
* untagBill() - unTag bill
* @param numbber billNumber - number of bill to untag
* @param string tag - tag for bill
* @param <function()> next
*/
RousrMongoDataSource.prototype.untagBill = function (billNumber, tag, next) {
    Bill.update({ number: billNumber }, { $pull: { tags: tag } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}