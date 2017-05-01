// FrameUser.js - abstracts a Frame user model for consumption by
// Frame clients
// note: using ES6 specification

module.exports = MakeFrameUser;

class FrameUser
{
  constructor()
  {
    this.userName = '';
  }
}

/**
* constructs a FrameUser object given the http response data
* from Frame API that returns user data
* @param {string} frameResponseData - Frame API user response data
**/
function MakeFrameUser(frameResponseData)
{
  var user = new FrameUser();

  const responseObj = JSON.parse(frameResponseData);
  const reponseUser = responseObj['user'];

  user.userName = reponseUser['username'];

  return user;
}
