// ClientService.js

module.exports = ClientService;

var constants = require('../../../Shared/SharedConstants');
var client = require('../OAuthModels/Client');

// constructor
function ClientService(clientDb)
{
  console.log('ClientService constructor');
  this.ClientDb = clientDb;
}

/*
* returns a client object from the client data source via
* the callback. queries client objects by passed in 'id'
* parameter
*/
ClientService.prototype.getById = function(id, callback)
{
  if (this.ClientDb != null)
  {
      this.ClientDb.collection(constants.CLIENTS_COLLECTION).findOne({id: parseInt(id)}, function(err, result) {
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
    callback(new Error('client db not initialized'), null);
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
