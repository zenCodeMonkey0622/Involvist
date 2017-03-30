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
  if (tokenData == null)
  {
    callback(new Error('no valid token'), null);
  }

  if (this.AuthDb == null)
  {
    callback(new Error('mongo db not initialized'), null);
  }

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

AuthorizationService.prototype.getAccessToken = function(tokenData, callback)
{
  if (tokenData == null)
  {
    callback(new Error('no valid token'), null);
    return;
  }

  if (this.AuthDb == null)
  {
    callback(new Error('mongo db not initialized'), null);
    return;
  }

  this.AuthDb.collection(constants.TOKEN_COLLECTION).findOne({access_token: tokenData}, function(err, result) {
    if (err)
    {
      console.log(err);
    }
    else
    {
      // TODO: check returned token result object against expiration date. if expired, purge the token
      // from the token data source. simple-oauth-server will do a check against expiration time on its own
      // and return the appropriate error message.
      callback(null, result);
    }
  });
}

AuthorizationService.prototype.saveAuthorizationCode = function(codeData, callback)
{
  // no implementation needed. does not get called with password grant type
}

AuthorizationService.prototype.getAuthorizationcode = function(code, callback)
{
    // no implementation needed. does not get called with password grant type
}
