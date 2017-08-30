const sharedConfig = require('../../Shared/Config/SharedConfig');

var config = {};

config.dataRetrieval = { schedule : {} };

config.dataRetrieval.retrieveDataOnStartup = true;

//Get data at 6 AM
config.dataRetrieval.schedule.hour = 06;
config.dataRetrieval.schedule.minute = 00;

config.databaseType = 'mongodb';
config.uri = 'mongodb://' + 
                sharedConfig.get('/rousrApi/congressDataSource/authCreds/user') + 
                ':' + sharedConfig.get('/rousrApi/congressDataSource/authCreds/password') + 
                '@' + sharedConfig.get('/rousrApi/congressDataSource/uri');

module.exports = config;