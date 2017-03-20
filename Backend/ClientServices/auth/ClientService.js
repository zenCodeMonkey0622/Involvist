// ClientService.js

module.exports = ClientService;

var mongoClient = require('mongodb').MongoClient;
var constants = require('../constants');
var client = require('./Client');

// constructor
function ClientService()
{
  // connect to the mongo db
  var mdbUri = 'mongodb://root:g0ld0ntheceiling@' + constants.CLIENTS_DATA_SOURCE;
  mongoClient.connect(mdbUri, function (err, db) {
    if (err) console.log(err);
    else
    {
      // debug do a query for a client by ID
      db.collection(constants.CLIENTS_COLLECTION).findOne({id: constants.DEBUG.AUTH_CLIENT_ID}, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
      });
    }
  });
}

/*
* returns a Client object via callback by performing
* a mongo query by id
*/
ClientService.prototype.getById = function(id, callback) {

    // debug:
    callback(null,
             new client(constants.DEBUG.AUTH_CLIENT_ID,
                        constants.DEBUG.AUTH_CLIENT_SECRET,
                        ['password']));

    // TODO:
    // go to the client collection of the mongo instance to get
    // the correct client object (should be a small collection)
}

/*
* returns true if a passed in redirect uri is valid for a given
* client. false otherwise.
*/
ClientService.prototype.isValidRedirectUri = function(client, requestedUri) {
    // debug:
    return true;

    // todo:
    // true redirect uri validation
}
