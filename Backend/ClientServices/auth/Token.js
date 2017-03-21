// Token.js

module.exports = Token;

function Token(tokenType, accessToken, refreshToken, expiresIn)
{
  this.tokenType = tokenType;
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
  this.expiresIn = expiresIn;
}
