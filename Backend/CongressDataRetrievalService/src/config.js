//TODO: use constants
//var constants = require('../../Common/constants');

var config = {};

config.dataRetrieval = { schedule : {} };

config.dataRetrieval.retrieveDataOnStartup = true;

//Get data at 6 AM
config.dataRetrieval.schedule.hour = 06;
config.dataRetrieval.schedule.minute = 00;

config.databaseType = 'mongodb';

//TODO use constants constants.CONGRESS_DATA_SOURCE;
config.uri = 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke'; 

module.exports = config;