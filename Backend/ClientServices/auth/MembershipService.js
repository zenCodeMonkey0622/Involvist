// MembershipService.js
var frame = require("../../UserManagement/frame-master/frame")
module.exports = MembershipService;

function MembershipService()
{
  console.log('MembershipService constructor');
}

MembershipService.prototype.areUserCredentialsValid = function(userName, password, scope, callback) {
    // debug
    return callback(null, true);

    // todo:
    // call into frame for credential verification
}
