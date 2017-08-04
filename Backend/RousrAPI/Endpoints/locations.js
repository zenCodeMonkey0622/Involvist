// locations.js
// base endpoint for location methods

'use strict';

const express = require('express');
const locationsRouter = express.Router();
const bodyParser = require('body-parser');
const csResponse = require('../DataTransfer/CSResponse');
const geoLocationService = require('../Location/GeoLocationService');

// to support JSON-encoded bodies
locationsRouter.use(bodyParser.json());

// to support url-encoded bodies
locationsRouter.use(bodyParser.urlencoded({
    extended: true
}));

locationsRouter.param('address', function (req, res, next, address) {
    req.query.address = address;
    next();
});

locationsRouter.get('/congress/district', function (req, res, next) {
    geoLocationService.geocodeAddress(req.query.address, (err, civicGeocode) => {
        
        if (err) {
            return next(err);
        }

        res.json(csResponse(true, '', civicGeocode));
    });
});

module.exports = locationsRouter;