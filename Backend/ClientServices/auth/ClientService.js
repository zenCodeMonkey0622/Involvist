// ClientService.js

module.exports = ClientService;

var constants = require('../constants');
var client = require('./Client');

// constructor
function ClientService(mongoDb)
{
  // debug:
  if (mongoDb != null)
  {
    console.log('client service received non-null mongo db reference.');
  }
  this._mongoDb = mongoDb;
}

/*
* returns a client object from the client data source via
* the callback. queries client objects by passed in 'id'
* parameter
*/
ClientService.prototype.getById = function(id, callback)
{
  if (this._mongoDb != null)
  {
      this._mongoDb.collection(constants.CLIENTS_COLLECTION).findOne({id: parseInt(id)}, function (err, result) {
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
