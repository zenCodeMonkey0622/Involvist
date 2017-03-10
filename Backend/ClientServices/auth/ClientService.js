// ClientService.js

module.exports = ClientService

var constants = require('../constants');
var client = require('./Client');

function ClientService()
{
}

ClientService.prototype.getById = function(id, callback) {
    
    // debug:
    callback(null, 
             client(constants.DEBUG.AUTH_CLIENT_ID, 
             constants.DEBUG.AUTH_CLIENT_SECRET, 
             ['password']));
    
    // todo:
    // go to the client collection of the mongo instance to get
    // the correct client object (should be a small collection)
}

ClientService.prototype.isValidRedirectUri = function(client, requestedUri) {
    // debug:
    return true;
    
    // todo:
    // true redirect uri validation
}