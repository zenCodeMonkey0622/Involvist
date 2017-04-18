// Client.js

module.exports = Client;

function Client(id, secret, grantTypes)
{
    this.id = id;
    this.secret = secret;  
    this.grantTypes = grantTypes;
}