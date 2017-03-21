// AuthorizationService.js

module.exports = AuthorizationService;

var constants = require('../constants');
var token = require('./Token');

function AuthorizationService(mongoDb)
{
  // debug:
  if (mongoDb != null)
  {
    console.log('authorization service received non-null mongo db reference.');
  }
  this._mongoDb = mongoDb;
}

AuthorizationService.prototype.saveAuthorizationCode = function(codeData, callback)
{
  // no implementation needed. does not get called with password grant type
}

/*
* saves an token object to the token data source
* and passes back the saved access token via callback
*/
AuthorizationService.prototype.saveAccessToken = function(tokenData, callback)
{
  if (this._mongoDb != null)
  {
    this._mongoDb.collection(constants.TOKEN_COLLECTION).insertOne(tokenData, function(err, result){
      if (err)
      {
        console.log(err);
      }
      else
      {
        callback(null, new token(tokenData.token_type, tokenData.access_token, tokenData.refresh_token, tokenData.expires_in));
      }
    });
  }
  else
  {
    callback(new Error('mongo db not initialized'), null);
  }
}

AuthorizationService.prototype.getAuthorizationcode = function(code, callback)
{
    // no implementation needed. does not get called with password grant type
}

AuthorizationService.prototype.getAccessToken = function(token, callback)
{
    // debug:
    return callback(null, null);

    // todo:
    // query the auth db's auth token collection keyed by the token value
}
