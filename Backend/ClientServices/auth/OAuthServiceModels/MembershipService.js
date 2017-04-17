// MembershipService.js
var frame = require('frame');
var frameLocalSvc = require('../../FrameClient/frameLocalService');

module.exports = MembershipService;

function MembershipService()
{
  console.log('MembershipService constructor');
  frameLocalService = new frameLocalSvc();
}

MembershipService.prototype.areUserCredentialsValid = function(userName, password, scope, callback)
{
    frameLocalService.findByCredentials(userName, password, (err, frameUser) => {
      if (err)
      {
        console.error('Membership Service error: ' + err.messsage);
        callback(err, false);
      }
      else
      {
        console.log('Frame returned user ' + frameUser.userName)
        console.log('Membership Service: user creds are valid!');
        callback(null, true);
      }
    });
}
