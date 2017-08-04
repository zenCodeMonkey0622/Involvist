// GeoCoordinate.js
// represents a geographic coordinate

'using strict';

/**
 * represents a geographic coordinate
 */
class GeoCoordinate {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }

    get isValid() {
        return (this.latitude != 0.0 && this.longitude != 0.0);
    }
}

module.exports = {

    /**
     * makeNullCoordinate - factory method for creating a null
     * geo coordinate object
     */
    makeNullCoordinate: function() {
        return new GeoCoordinate();
    },

    /**
     * makeGeoCoordinate - factory method for a GeoCoordinate object
     * @param {double} lat - latitude, degrees
     * @param {double} long - longitude, degrees
     */
    makeGeoCoordinate: function(lat, long) {
        var coord = new GeoCoordinate();
        coord.latitude = lat;
        coord.longitude = long;

        return coord;
    }
}