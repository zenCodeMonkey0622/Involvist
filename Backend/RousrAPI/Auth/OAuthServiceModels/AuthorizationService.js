// AuthorizationService.js

module.exports = AuthorizationService;

const debugUtil = require('../../../Shared/Debug/debugUtility');
const constants = require('../../../Shared/SharedConstants');
const token = require('../OAuthModels/Token');

function AuthorizationService(authDb)
{
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

  this.AuthDb.collection(constants.ROUSR_API_TOKEN_COLLECTION).insertOne(newToken, function(err, result) {
    if (err)
    {
      debugUtil.debugLog(err);
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

  this.AuthDb.collection(constants.ROUSR_API_TOKEN_COLLECTION).findOne({access_token: tokenData}, function(err, result) {
    if (err)
    {
      debugUtil.debugLog(err);
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
