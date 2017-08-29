// RousrDataSource.js
// Defines an interface to the Rousr Congress Data repository, including
// access to legislation and congress members

'use strict'

module.exports = new RousrDataSource();

const mongoImplementation = require('./RousrMongoDataSource');
const dynamoImplementation = require('./RousrDynamoDataSource');

// Define the Rousr data source object
function RousrDataSource() {}

// Our default implementation is MongoDb
RousrDataSource.prototype.implementation = mongoImplementation;

// Our Factory method for creating new Database instances
RousrDataSource.prototype.create = function (options) {

  switch(options.databaseType){
    case 'mongodb':
      this.implementation = mongoImplementation;
      break;
    case 'dynamodb':
      this.implementation = dynamoImplementation;
      break;
  }

  return new this.implementation(options);
};