'use strict'

module.exports.DatabaseFactory = new DatabaseFactory();

var mongoose = require('mongoose');
var CongressMember = require('../Models/congress').CongressMember;
var Bill = require('../Models/bill').Bill;

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
        console.log('DB connection: ' + options.uri + ' successful');
    });
}

/**
* UpdateBills() - Updates bills in the bills collection
* @param <[{Bill}]> array of Bill objects
* @param <function()> next
*/
MongoDb.prototype.updateBills = function (billsToUpdate, next) {
	billsToUpdate.forEach(function(billData) {
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
 * UpdatePrimarySubjectCache() - upates bills in a primary subject table
 * @param <mongoose.Model> - the mongoose model object to update
 * @param <[{SubjectCacheBill}]> - array of subject cache bill objects to update. this collection
 * is of the same model type (i.e. HealthCacheBill, EnviroCacheBill, etc..)
 * @param <function()> - next middleware to call
 */
MongoDb.prototype.UdpatePrimarySubjectCacheBills = function(subjectCacheModel, subjectCacheData, next)
{
    subjectCacheData.forEach( function(cacheData) {
    
        subjectCacheModel.update(
            {primary_subject: cacheData.primary_subject},
            { $set: subjectCacheData },
            { upsert: true},
            function (err, raw) {
                if (err)
                {
                    return next(err);
                }
            }
        );
    });

    next();
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

    for (var i = 0; i < keys.length; i++) {
        if (billKeys.indexOf(keys[i]) !== -1) {
            var filterParam = keys[i];
            var queryValue = reqQuery[filterParam];
            //'$' is to search for the exact value.  For example looking for h.r.300 and not every number containing h.r.300, such as h.r.3002
            query[filterParam] = { '$regex': queryValue + '$', '$options': 'i' };
        }
    }

    if (keys.indexOf('q') >= 0) {
        query = {
            $and: [
                {
                    $or: [  { 'number': { '$regex': reqQuery.q, '$options': 'i' } },
                            { 'title': { '$regex': reqQuery.q, '$options': 'i' } },
                            { 'primary_subject': { '$regex': reqQuery.q, '$options': 'i' } },
                            { 'description': { '$regex': reqQuery.q, '$options': 'i' } },
                            { 'summary': { '$regex': reqQuery.q, '$options': 'i' } },
                            { 'tags': { '$regex': reqQuery.q, '$options': 'i' } }
                    ]
                },
                query
            ]
        }
    }

	Bill.find(query, function(err, docs){
		if(err){
			return callback(err);
		}
		callback(null, docs);
	});
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

// Define a skeleton databas factory
function DatabaseFactory() {}

// Define the prototypes and utilities for this factory

// Our default databaseClass is MongoDb
DatabaseFactory.prototype.databaseClass = MongoDb;

// Our Factory method for creating new Database instances
DatabaseFactory.prototype.createDatabase = function ( options ) {

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
