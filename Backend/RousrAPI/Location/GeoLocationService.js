// GeoLocationService.js
// provides methods for geolocating/geocoding an address

'use strict';

const geoCoord = require('./GeoCoordinate');

/**
* A constructor for defining GeoLocationService
*/
var GeoLocationService = function() {
	
}

/**
 * geocodeAddress - converts a standard street address to a lat/long equivalent
 * @param {string} address - standard u.s. street address, city, and state
 * @param {function(err, GeoCoordinate)} - callback function
 */
GeoLocationService.prototype.geocodeAddress = function(address, callback) {
    // todo:
    return callback(null, geoCoord(0, 0));
}

module.exports = new GeoLocationService();