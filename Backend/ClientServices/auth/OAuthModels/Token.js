// Token.js

module.exports = Token;

function Token(clientId, tokenType, accessToken, refreshToken, expiresIn)
{
  // clientId is the only property camelCased by the simple-oauth-server lib.
  // ¯\_(ツ)_/¯
  this.clientId = clientId;
  this.token_type = tokenType;
  this.access_token = accessToken;
  this.refresh_token = refreshToken;
  this.expires_in = expiresIn;
}
