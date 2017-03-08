// ClientService.js

module.exports = ClientService

var constants = require('../constants');
var client = require('./Client');

function ClientService()
{
}

ClientService.prototype.getById = function(id, callback) {
    // debug - always pass back this one client object
    callback(client(constants.DEBUG.AUTH_CLIENT_ID, constants.DEBUG.AUTH_CLIENT_SECRET, ['password']));
}

ClientService.prototype.isValidRedirectUri = function(client, requestedUri) {
    // todo
}