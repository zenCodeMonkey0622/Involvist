// AuthorizationService.js

module.exports = AuthorizationService;

var constants = require('../constants');
var token = require('./Token');

function AuthorizationService(authDb)
{
  console.log('AuthorizationService constructor');
  this.AuthDb = authDb;
}

/*
* saves an token object to the token data source
* and passes back the saved access token via callback
*/
AuthorizationService.prototype.saveAccessToken = function(tokenData, callback)
{
  if (this.AuthDb != null)
  {
    var newToken  = new token(tokenData.clientId,
                              tokenData.token_type,
                              tokenData.access_token,
                              tokenData.refresh_token,
                              tokenData.expires_in);

    this.AuthDb.collection(constants.TOKEN_COLLECTION).insertOne(newToken, function(err, result) {
      if (err)
      {
        console.log(err);
      }
      else
      {
        callback(null, newToken);
      }
    });
  }
  else
  {
    callback(new Error('mongo db not initialized'), null);
  }
}

AuthorizationService.prototype.getAccessToken = function(token, callback)
{
  if (this.AuthDb != null)
  {
    this.AuthDb.collection(constants.TOKEN_COLLECTION).findOne({clientId: parseInt(token.clientId), token: token.access_token}, function(err, result) {
      if (err)
      {
        console.log(err);
      }
      else
      {
        callback(null, token);
      }
    });
  }
  else
  {
    callback(new Error('mongo db not initialized'), null);
  }
    // debug:
    return callback(null, null);

    // todo:
    // query the auth db's auth token collection keyed by the token value
}

AuthorizationService.prototype.saveAuthorizationCode = function(codeData, callback)
{
  // no implementation needed. does not get called with password grant type
}

AuthorizationService.prototype.getAuthorizationcode = function(code, callback)
{
    // no implementation needed. does not get called with password grant type
}
