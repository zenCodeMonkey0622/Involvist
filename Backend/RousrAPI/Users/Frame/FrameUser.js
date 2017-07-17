// FrameUser.js - abstracts a Frame user model for consumption by
// Frame clients
// note: using ES6 specification

module.exports = MakeFrameUser;

class FrameUser
{
  constructor()
  {
    this.userName = '';
    this.realName = '';
    this.email = '';
    this.userID = '';
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
  const responseUser = responseObj['user'];  
  const account = responseUser['roles']['account'];

  user.userName = responseUser['username'];
  user.realName = account['name'];
  user.email = responseUser['email'];
  user.userID = responseUser['_id'];

  return user;
}
