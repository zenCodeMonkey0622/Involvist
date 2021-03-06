// MembershipService.js
const frameLocalSvc = require('../../Users/Frame/FrameLocalService');
const debugUtil = require('../../../Shared/Debug/debugUtility');

module.exports = MembershipService;

function MembershipService()
{
  frameLocalService = new frameLocalSvc();
}

MembershipService.prototype.areUserCredentialsValid = function(userName, password, scope, callback)
{
    frameLocalService.findByCredentials(userName, password, (csResponse, frameUser) => {
      if (!csResponse.success)
      {
        console.error('Membership service error: ' + csResponse.responseMessage);
        callback(null, false);
      }
      else
      {
        debugUtil.debugLog('Membershp service returned valid user ' + frameUser.userName)
        callback(null, true);
      }
    });
}
