// GeoLocationService.js
// provides methods for geolocating/geocoding an address

'use strict';

const https = require('https');	
const querystring = require('querystring');
const Geocodio = require('geocodio');

const sharedConstants = require('../../Shared/SharedConstants');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const geoCoord = require('./GeoCoordinate');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const debugUtil = require('../../Shared/Debug/debugUtility');

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
    
    geocodioMapToDistrict(address, (err, geocode) => {
        if (err) return callback(err, null);
    });
}

// Private

/**
 * geocodioMapToDistrict - converts a u.s. street address to lat/long with
 * congressional district data
 * @param {string} addressToMap 
 * @param {function(err, GeoCoordinate)} callback 
 */
function geocodioMapToDistrict(addressToMap, callback) {
    var config = {
        api_key: sharedConstants.GEOCODIO_API_KEY
    }

    var geocodio = new Geocodio(config);

    geocodio.get('geocode', {q: addressToMap, fields: ['cd']}, function(err, response){
    if (err) return callback(new Error(err.message), null);

});
}

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

    const queryRequest = httpUtil.makeHttpsRequest(sharedConfig.get('/geoCodeApi/host'), 
        null, 
        sharedConfig.get('/geoCodeApi/path') + formData,
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
                    return callback(new Error('Unable to get valid geocode response.'), null);
                }
            });
        });

    queryRequest.on('error', (e) => {
        debugUtil.debugErrorLog('error during google geocode api: ' + e.message);
        return callback(new Error(e.message), null);
    });

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