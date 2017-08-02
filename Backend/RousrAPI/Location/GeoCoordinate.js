// GeoCoordinate.js
// represents a geographic coordinate

//module.exports = geoCoordinateFactory;

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
        var coord = new GeoCoordinate();
        coord.latitude = 0.0;
        coord.longitude = 0.0;

        return coord;
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