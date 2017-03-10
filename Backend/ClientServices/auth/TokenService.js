// TokenService.js

module.exports = TokenService

var uuidGen = require('../uuid/v4');

function TokenService()
{
}

TokenService.prototype.generateToken = function(callback) {
    // debug?
    return callback(null, uuidGen());
    
    // todo:
    // anything other than this?
}

TokenService.prototype.generateAuthorizationCode = function(callback) {
    // debug?
    return callback(null, uuidGen());
    
    // todo: 
    // anything other than this?
}

