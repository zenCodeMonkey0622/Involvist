// TokenService.js

module.exports = TokenService;

// generates an RFC4122 v4 uuid
var uuidv4Gen = require('uuid/v4');

function TokenService()
{
  console.log('TokenService constructor');
}

TokenService.prototype.generateToken = function(callback)
{
    return callback(null, uuidv4Gen());
}

TokenService.prototype.generateAuthorizationCode = function(callback)
{
    return callback(null, uuidv4Gen());
}
