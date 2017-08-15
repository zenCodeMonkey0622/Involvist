// debugUtility.js
// methods for useful for debugging

const sharedConfig = require('../Config/SharedConfig');

module.exports = {
    /**
     * Gets the time.
     */
    debugTimeNow: function () {
        var now = new Date();
        return ((now.getHours() < 10) ? '0' : '') + now.getHours() + ":" + ((now.getMinutes() < 10) ? '0' : '') + now.getMinutes() + ':' + ((now.getSeconds() < 10) ? '0' : '') + now.getSeconds();
    },

    /**
     * Gets the date of now.
     */
    debugDateNow: function () {
        var now = new Date();
        return this.formatDate(now);
    },

    /**
     *Formats the date.
     */
    formatDate: function (date) {      
        var day = date.getDate();
        day = date.getDate() < 10 ? '0' + day : day;
        //Have to add 1 because getMonth gets the index of the month
        var month = (date.getMonth() + 1);
        month = month < 10 ? '0' + month : month;
        var year = date.getFullYear();
        return month + '-' + day + '-' + year;
    },


    /**
     * Logs a message to the console if we're in a debug enviro.
     */
    debugLog: function(message) {
        if (sharedConfig.get('/debug/enableLogOutput')) {
            console.log(module.exports.debugTimeNow() + ': ' + message);
        }
    },

    debugErrorLog: function(message) {
        if (sharedConfig.get('/debug/enableLogOutput')) {
            console.error(module.exports.debugTimeNow() + ': ' + message);
        }
    }
}
