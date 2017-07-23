// debugUtility.js
// methods for useful for debugging

const sharedConfig = require('../Config/SharedConfig');

module.exports = {

    /**
     * Gets the time.
     */
    debugTimeNow: function()
    {
        var now = new Date();
        return ((now.getHours() < 10) ? '0' : '') + now.getHours() + ":" + ((now.getMinutes() < 10) ? '0' : '') + now.getMinutes() + ':' + ((now.getSeconds() < 10) ? '0' : '') + now.getSeconds();
    },

    /**
     * Logs a message to the console if we're in a debug enviro.
     */
    debugLog: function(message)
    {
        if (sharedConfig.get('/debug/enableLogOutput')) {
            console.log(message);
        }
    }

}
