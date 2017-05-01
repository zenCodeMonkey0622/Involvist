// MembershipService.js
const frameLocalSvc = require('../../Users/frameLocalService');

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
        console.error('Membership service error: ' + err.messsage);
        callback(err, false);
      }
      else
      {
        console.log('Membershp service returned valid user ' + frameUser.userName)
        callback(null, true);
      }
    });
}
