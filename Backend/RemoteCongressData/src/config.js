var sharedConstants = require('../../Shared/SharedConstants');

var config = {};

config.dataRetrieval = { schedule : {} };

config.dataRetrieval.retrieveDataOnStartup = true;

//Get data at 6 AM
config.dataRetrieval.schedule.hour = 06;
config.dataRetrieval.schedule.minute = 00;

config.databaseType = 'mongodb';
config.uri = sharedConstants.ROUSR_CONGRESS_DATA_SOURCE;

module.exports = config;