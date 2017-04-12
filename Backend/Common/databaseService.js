'use strict'

module.exports.DatabaseFactory = new DatabaseFactory();

var mongoose = require('mongoose');
var CongressMember = require('./models/congress').CongressMember;
var Bill = require('./models/bill').Bill;

/**
* A constructor for defining new mongoDb database service
*/
function MongoDb(options){ 

    var mongoUri = options.mongo.uri || '//localhost:27017';
    var mongoDatabase = options.mongo.db || 'qa3';

    var uri = mongoUri + '/' + mongoDatabase; 

    console.log('MongoDB URI:  ' + uri);  	

    mongoose.connect('mongodb:' + uri);

    var db = mongoose.connection;

    db.on('error', function(err){
        console.error('Connection Error:', err);	
    });

    db.once('open', function(){
        console.log('DB connection successful');
    });
}

/**
* UpdateBills() - Updates bills in the bills collection
* @param <[{Bill}]> data 
* @param <function()> next 
*/
MongoDb.prototype.updateBills = function (data, next) {
	data.forEach(function(billData) {	
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


