// ClientService.js

module.exports = ClientService;

var constants = require('../constants');
var client = require('./Client');

// constructor
function ClientService()
{
  // initialize private members
  this._mongoClient = require('mongodb').MongoClient;
  this._mongoDb = null;

  // connect to the mongo db
  var mdbUri = 'mongodb://root:g0ld0ntheceiling@' + constants.CLIENTS_DATA_SOURCE;
  this._mongoClient.connect(mdbUri, function (err, db) {
    if (err)
    {
      console.log(err);
    }
    else
    {
      console.log('successfully connected to mongo');
      this._mongoDb = db;
    }
  });
}

/*
* returns a client object from the client data source via
* the callback. queries client objects by passed in 'id'
* parameter
*/
ClientService.prototype.getById = function(id, callback)
{
  if (_mongoDb != null)
  {
      _mongoDb.collection(constants.CLIENTS_COLLECTION).findOne({id: parseInt(id)}, function (err, result) {
      if (err)
      {
        console.log(err);
      }
      else
      {
        callback(null, new client(result.id, result.secret, result.grant_types));
      }
    });
  }
  else
  {
    callback(null, null);
  }
}

/*
* returns true if a passed in redirect uri is valid for a given
* client. false otherwise.
*/
ClientService.prototype.isValidRedirectUri = function(client, requestedUri)
{
    // sine we currently do not use redirect uris, always return true
    return true;
}
