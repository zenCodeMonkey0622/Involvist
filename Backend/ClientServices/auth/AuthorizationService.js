// AuthorizationService.js

module.exports = AuthorizationService;

var constants = require('../constants');
var token = require('./Token');

// debug:
var codes = {};
var tokens = {};

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
  // does not get called with password grant type
    // debug:
    codes[codeData.code] = codeData;
    return callback(null, codes[codeData.code]);

    // todo:
    // save the code data to the auth db's auth codes collection
}

AuthorizationService.prototype.saveAccessToken = function(tokenData, callback)
{
    //debug:
    tokens[tokenData.access_token] = tokenData;
    return callback(null, tokens[tokenData.access_token]);

    // todo:
    // save the token data to the auth db's auth tokens collection
}

AuthorizationService.prototype.getAuthorizationcode = function(code, callback)
{
    // debug:
    return callback(null, codes[code]);

    // todo:
    // query the auth db's auth code collection keyed by the code value
}

AuthorizationService.prototype.getAccessToken = function(token, callback)
{
    // dbeug:
    return callback(null, tokens[token]);

    // todo:
    // query the auth db's auth token collection keyed by the token value
}
