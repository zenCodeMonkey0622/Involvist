// ClientService.js

module.exports = ClientService;

var mongoClient = require('mongodb').MongoClient;
var constants = require('../constants');
var client = require('./Client');

function ClientService()
{
  var mdbUri = 'mongodb://root:g0ld0ntheceiling@' + constants.CLIENTS_DATA_SOURCE;
  mongoClient.connect(mdbUri, null, function (err, db) {
    if (err) console.log(err);
    else console.log('successfully connected to mongodb');
  });
}

ClientService.prototype.getById = function(id, callback) {

    // debug:
    callback(null,
             new client(constants.DEBUG.AUTH_CLIENT_ID,
                        constants.DEBUG.AUTH_CLIENT_SECRET,
                        ['password']));

    // todo:
    // go to the client collection of the mongo instance to get
    // the correct client object (should be a small collection)
}

ClientService.prototype.isValidRedirectUri = function(client, requestedUri) {
    // debug:
    return true;

    // todo:
    // true redirect uri validation
}
