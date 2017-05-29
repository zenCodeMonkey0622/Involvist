// CSResponse.js
// implementation for client services response data
// note: using newer ES6 specification, which should be fine since no browser
// will be running this.

module.exports = MakeCSResponse;

class CSResponse
{
    constructor()
    {
      this.success = true;
      this.responseMessage = '';
    }

    toString()
    {
      console.log('success: ', this.success, 'response message: ', this.responseMessage);
    }
}

/**
* CSResponse factory method.
* @param {bool} success - true if request was successful
* @param {string} message - descriptive result message
* @param {object} data - associated data
**/
function MakeCSResponse(success, message, data)
{
  var resp = new CSResponse();
  resp.success = success;
  resp.responseMessage = message;
  resp.data = data;

  return resp;
}
