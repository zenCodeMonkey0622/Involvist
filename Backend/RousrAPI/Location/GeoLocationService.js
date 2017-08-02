// GeoLocationService.js
// provides methods for geolocating/geocoding an address

'use strict';

const https = require('https');	
const querystring = require('querystring');
const sharedConstants = require('../../Shared/SharedConstants');
const geoCoord = require('./GeoCoordinate');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');

// Public

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
    
    googleGeocodeTransform(address, (err, geocode) => {
        return callback(null, geocode);
    });
}

// Private

/**
 * googleGeocodeTransform - converts a standard street address to a lat/long equiv
 * using Google Geocode service
 * @param {string} addressToCode 
 * @param {function (err, GeoCoordinate)} callback 
 */
function googleGeocodeTransform(addressToCode, callback) {

    const form = {
        // replace all spaces with '+' character for sending the
        // form data across.
        address: addressToCode.replace(/\s/g, '+'),
        key: sharedConstants.GOOGLE_GEOCODING_API_KEY
    };

    const formData = querystring.stringify(form);

    const queryRequest = httpUtil.makeHttpsRequest('maps.googleapis.com', 
        null, 
        '/maps/api/geocode/json?' + formData,
        httpUtil.requestType.GET, 
        null, 
        null, 
        httpUtil.contentType.WWW_FORM_URLENCODED, 
        null, 
        null,
        (res) => {

            var responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode == '200') {
                    var coords = parseGoogGeocodeResponse(responseData);
                    return callback(null, coords);
                }
                else {
                    return callback(null, null);
                }
            });
        });

    queryRequest.on('error', (e) => {
        console.error('error during googleGeocodeTransform: ', e.message);
    });

    //queryRequest.write(formData);
    queryRequest.end();
};

function parseGoogGeocodeResponse(responseData) {

    if (responseData == null) return geoCoord.makeNullCoordinate();

    var response = JSON.parse(responseData);

    if (response.status != 'OK' || response.results.length == 0) return geoCoord.makeNullCoordinate();

    var location = response.results[0].geometry.location;

    return geoCoord.makeGeoCoordinate(location.lat, location.lng);
}

// this has to be the last line for some reason (?)
module.exports = new GeoLocationService();