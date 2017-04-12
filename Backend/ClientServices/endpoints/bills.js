//bills.js
//The endpoints for the bills 
'use strict'

var express = require('express');
var billsRouter = express.Router();
var billsService = require('../bills/BillsService');

//Using .bind(billsService) so the callse will be in the scope of the billsService
//Example of a search - http://localhost:3000/api/v1/bills/search?q=dog&client_id=1
billsRouter.get('/search', billsService.getBillByNumber.bind(billsService), billsService.getBillsBySponsorId.bind(billsService), billsService.getBillsByTitle.bind(billsService),
 billsService.getBillsByPrimarySubject.bind(billsService), function(req, res) {
 	res.json(req.bills);
});

//Example - http://localhost:3000/api/v1/bills/bill/H.R.4881?client_id=1
billsRouter.get('/bill/:number', function(req, res){	
	res.json(req.bills);
});

//Example - http://localhost:3000/api/v1/bills/sponsor/T000476?client_id=1
billsRouter.get('/sponsor/:sponsorId', function(req, res){
	res.json(req.bills);
});

billsRouter.param('number', function(req, res, next, billNumber){
	req.query.q = billNumber;
	billsService.getBillByNumber(req, res, next); 
});

billsRouter.param('sponsorId', function(req, res, next, id){	
    //console.log('sponsorId: ' + id);
    req.query.q = id;
	billsService.getBillsBySponsorId(req, res, next);
});

module.exports = billsRouter;