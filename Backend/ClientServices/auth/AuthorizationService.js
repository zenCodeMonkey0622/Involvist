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
AuthorizationService.prototype.saveAccessToken = function(token, callback)
{
  if (token == null)
  {
    callback(new Error('no valid token'), null);
  }

  if (this.AuthDb == null)
  {
    callback(new Error('mongo db not initialized'), null);
  }

  var newToken  = new token(token.clientId,
                            token.token_type,
                            token.access_token,
                            token.refresh_token,
                            tokentokenData.expires_in);

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

AuthorizationService.prototype.getAccessToken = function(token, callback)
{
  if (token == null)
  {
    callback(new Error('no valid token'), null);
    return;
  }

  if (this.AuthDb == null)
  {
    callback(new Error('mongo db not initialized'), null);
    return;
  }

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

AuthorizationService.prototype.saveAuthorizationCode = function(codeData, callback)
{
  // no implementation needed. does not get called with password grant type
}

AuthorizationService.prototype.getAuthorizationcode = function(code, callback)
{
    // no implementation needed. does not get called with password grant type
}
