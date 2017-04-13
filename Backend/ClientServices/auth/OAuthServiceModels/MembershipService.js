// MembershipService.js
var frame = require('frame');
var frameLocalSvc = require('../frameLocalService');

module.exports = MembershipService;

function MembershipService()
{
  console.log('MembershipService constructor');
  frameLocalService = new frameLocalSvc();
}

MembershipService.prototype.areUserCredentialsValid = function(userName, password, scope, callback)
{
    frameLocalService.findByCredentials(userName, password, (err, user) => {
      if (err)
      {
        console.error('Membership Service error: ' + err.messsage);
        callback(err, false);
      }
      else
      {
        console.log('Membership Service: user creds are valid!');
        callback(null, true);
      }
    });
}
