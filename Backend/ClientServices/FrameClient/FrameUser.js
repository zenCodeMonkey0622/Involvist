// FrameUser.js - abstracts a Frame user model for consumption by
// Frame clients

module.exports = FrameUser;

/**
* constructs a FrameUser object given the http response data
* from Frame API that returns user data
* @param {string} frameUserResponseData - Frame API user response data
**/
function FrameUser(frameUserResponseData)
{
  const responseObj = JSON.parse(frameUserResponseData);
  const reponseUser = responseObj['user'];

  this.userName = reponseUser['username'];
}
