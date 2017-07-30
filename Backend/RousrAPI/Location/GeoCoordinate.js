// GeoCoordinate.js
// represents a geographic coordinate

module.exports = makeGeoCoordinate;

class GeoCoordinate {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }
}

/**
 * makeGeoCoordinate - factory method for a GeoCoordinate object
 * @param {double} lat - latitude, degrees
 * @param {double} long - longitude, degrees
 */
function makeGeoCoordinate(lat, long) {
    var coord = new GeoCoordinate();
    coord.latitude = lat;
    coord.longitude = long;

    return coord;
}