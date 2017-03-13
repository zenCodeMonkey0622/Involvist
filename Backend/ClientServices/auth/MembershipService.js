// MembershipService.js

module.exports = MembershipService;

function MembershipService()
{
}

MembershipService.prototype.areUserCredentialsValid = function(userName, password, scope, callback) {
    // debug
    return callback(null, true);

    // todo:
    // call into frame for credential verification
}
