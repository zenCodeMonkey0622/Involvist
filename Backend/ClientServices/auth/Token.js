// Token.js

module.exports = Token;

function Token(clientId, tokenType, accessToken, refreshToken, expiresIn)
{
  this.clientId = clientId;
  this.tokenType = tokenType;
  this.accessToken = accessToken;
  this.refreshToken = refreshToken;
  this.expiresIn = expiresIn;
}
