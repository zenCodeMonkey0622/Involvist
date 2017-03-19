// ClientService.js

module.exports = ClientService;

var mdb = require('mongodb');
var constants = require('../constants');
var client = require('./Client');

var mongoClient = mdb.MongoClient();

function ClientService()
{
}

ClientService.prototype.getById = function(id, callback) {

    // debug:
    callback(null,
             new client(constants.DEBUG.AUTH_CLIENT_ID,
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
