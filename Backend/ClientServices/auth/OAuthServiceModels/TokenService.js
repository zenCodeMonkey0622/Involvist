// TokenService.js

module.exports = TokenService;

var uuidGen = require('uuid/v4');

function TokenService()
{
}

TokenService.prototype.generateToken = function(callback)
{
    return callback(null, uuidGen());
}

TokenService.prototype.generateAuthorizationCode = function(callback)
{
    return callback(null, uuidGen());
}
