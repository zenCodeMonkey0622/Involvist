// RousrCongressDataService.js
// Defines an interface to the Rousr Congress Data repository, including
// access to legislation and congress members

'use strict'

module.exports.RousrCongressDataService = new RousrCongressDataService();

const debugUtil = require('../../Shared/Debug/debugUtility');
const stringParser = require('../../Shared/Parsers/stringParse');
// we use mongoose for mongoDb object modeling
const mongoose = require('mongoose');
const CongressMember = require('../Models/CongressMember').CongressMember;
const Bill = require('../Models/bill').Bill;

/**
* A constructor for defining new mongoDb database service
*/
function MongoDb(options) {
    mongoose.connect(options.uri);
    var db = mongoose.connection;

    db.on('error', function(err) {
        console.error('Connection Error:', err);
    });

    db.once('open', function(){
        debugUtil.debugLog('DB connection: ' + options.uri + ' successful');
    });
}

/**
* UpdateMembers() - Updates members in the congressMembers collection
* @param <[{CongressMember}]> data
* @param <function()> next
*/
MongoDb.prototype.updateMembers = function (data, callback) {
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
MongoDb.prototype.queryMembers = function (query, callback) {
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
MongoDb.prototype.updateBills = function (billsToUpdate, next) {
    billsToUpdate.forEach(function(billData) {

        // parse the primary_subject string into components and
        // set the added primary_subjects array
        billData.primary_subjects = stringParser.parsePrimarySubjects(billData.primary_subject);

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
MongoDb.prototype.queryBills = function (reqQuery, callback) {
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
* @param <object> reqQuery - has a name field, which will be alphanumeric, and an optional exact field
* @param <function()> callback
*/
MongoDb.prototype.getBillsByName = function (reqQuery, callback) {
    var billName = reqQuery.name;
    var keys = Object.keys(reqQuery);
    
    // by default we use regex
    var useRegex = true;

    // if the 'exact' parameter is passed, set the useRegex
    // based on the value
    if (keys.indexOf('exact') >= 0) {
        useRegex = !reqQuery.exact
    }

    var findQuery = Bill.find();
    findQuery.where({ 'name': useRegex ? { '$regex': billName.toLowerCase() } : billName.toLowerCase() });
    findQuery.select({
        number: 1,
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

        debugUtil.debugLog('getBillsByName found ' + docs.length + ' results');

        callback(null, docs);
    });
}

/**
* tagBill() - Tag bill
* @param numbber billNumber - number of bill to tag
* @param string tag - tag for bill
* @param <function()> next
*/
MongoDb.prototype.tagBill = function (billNumber, tag, callback) {
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
MongoDb.prototype.untagBill = function (billNumber, tag, next) {
    Bill.update({ number: billNumber }, { $pull: { tags: tag } }, function (err, results) {
        if (err) {
            console.error(err);
            return next(err);
        }

        return next(null, results);
    });
}

//A constructor for defining AWS DyanamoDB databaseS
//PLACE HOLDER for now
function DynamoDb( ){
  this.uri = '//localhost:27017/qa1';
  //this.dynamoDb = require("dynamodb");
  //this.save = function(data){
  	//Do sturff
  //}
}

// Define a skeleton database factory
function RousrCongressDataService() {}

// Define the prototypes and utilities for this factory

// Our default databaseClass is MongoDb
RousrCongressDataService.prototype.databaseClass = MongoDb;

// Our Factory method for creating new Database instances
RousrCongressDataService.prototype.createDatabase = function ( options ) {

  switch(options.databaseType){
    case 'mongodb':
      this.databaseClass = MongoDb;
      break;
    case 'dynamodb':
      this.databaseClass = DynamoDb;
      break;
  }

  return new this.databaseClass( options );
};
