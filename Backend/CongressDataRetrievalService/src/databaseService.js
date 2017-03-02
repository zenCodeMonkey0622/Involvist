'use strict'
var mongoose = require("mongoose");
var CongressMember = require("../models/congress").CongressMember;
var Bill = require("../models/bill").Bill;
var config = require('./config');

/**
* A constructor for defining new mongoDb database service
*/
function MongoDb(options ){ 

	var mongoUri = config.mongo.uri || '//localhost:27017';
	var mongoDatabase = config.mongo.db || 'qa3';

  	var uri = mongoUri + '/' + mongoDatabase; 

  	console.log('MongoDB URI:  ' + uri);  	

  	mongoose.connect("mongodb:" + uri);

	var db = mongoose.connection;

	db.on("error", function(err){
		console.error("Connection Error:", err);	
	});

	db.once("open", function(){
		console.log("DB connection successful");
	});

	/**
	* UpdateBills() - Updates bills in the bills collection
	* @param <[{Bill}]> data 
	* @param <function()> next 
	*/
	this.UpdateBills = function(data, next) {		
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
	this.UpdateMembers = function(data, callback) {		
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
	* QueryBills() - Queries the bills collection
	* @param <object> query - example {number: billNumber}
	* @param <function()> callback 
	*/
	this.QueryBills = function(query, callback) {
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
	this.QueryMembers = function(query, callback) {
		CongressMember.find(query, function(err, docs){
			if(err){				
				return callback(err);
			}			
			callback(null, docs);
		});
	}  	
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
 
// Our default vehicleClass is MongoDb
DatabaseFactory.prototype.databaseClass = MongoDb;
 
// Our Factory method for creating new Database instances
DatabaseFactory.prototype.createDatabase = function ( options ) {
 
  switch(options.databaseType){
    case "mongodb":
      this.databaseClass = MongoDb;
      break;
    case "dynamodb":
      this.databaseClass = DynamoDb;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }
 
  return new this.databaseClass( options );
 
};

module.exports.DatabaseFactory = new DatabaseFactory();
