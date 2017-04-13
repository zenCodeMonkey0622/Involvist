var config = {};

config.dataRetrieval = { schedule : {} };

config.dataRetrieval.retrieveDataOnStartup = true;

//Get data at 6 AM
config.dataRetrieval.schedule.hour = 06;
config.dataRetrieval.schedule.minute = 00;

config.databaseType = 'mongodb';

//mongo database
config.mongo = {};
config.mongo.uri = '//localhost:27017';
config.mongo.db = 'qa4';

module.exports = config;