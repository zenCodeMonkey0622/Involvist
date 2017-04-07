//bills.js
//The endpoints for the bills 
'use strict'

var express = require('express');
var billsRouter = express.Router();
var billsService = require('../bills/BillsService');

//Using .bind(billsService) so the callse will be in the scope of the billsService
//Example of a search - http://localhost:3000/api/v1/bills/search?q=dog&client_id=1
billsRouter.get('/', billsService.queryBills.bind(billsService), function(req, res) {
    res.json(req.bills);
});

//Example - http://localhost:3000/api/v1/bills/H.R.4881?client_id=1
billsRouter.get('/:number', function(req, res){	
    res.json(req.bills);
});

billsRouter.param('number', function(req, res, next, billNumber){
    req.query.number = billNumber;
    billsService.queryBills(req, res, next);
});

module.exports = billsRouter;