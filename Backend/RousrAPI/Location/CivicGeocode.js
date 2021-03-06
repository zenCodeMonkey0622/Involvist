// CivicGeocode.js
// represents a geographic location's civic data

'using strict';

module.exports = makeCivicGeocode;

const geoCoord = require('./GeoCoordinate');
const civicData = require('./CivicData');

/**
 * represents a geographic location's civic data
 */
class CivicGeocode {
    constructor() {
        this.geoCoordinate = geoCoord.makeNullCoordinate();
        this.civicData = civicData.makeNullCivicData();
    }
}

/**
 * makeCivicGeocode - factory method for creating a CivicGeocode object
 * @param {GeoCoordinate} geoCoord 
 * @param {CivicData} civicData 
 */
function makeCivicGeocode(geoCoord, civicData) {
    var geocode = new CivicGeocode();
    geocode.geoCoordinate = geoCoord;
    geocode.civicData = civicData;

    return geocode;
}
