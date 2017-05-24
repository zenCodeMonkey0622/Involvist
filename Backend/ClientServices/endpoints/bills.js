//bills.js
//The endpoints for the bills
'use strict'

var express = require('express');
var billsRouter = express.Router();
var billsService = require('../bills/BillsService');

//Using .bind(billsService) so the callse will be in the scope of the billsService
//Example of a search - http://localhost:3000/api/v1/bills?q=dog&congress=115
billsRouter.get('/', billsService.queryBills.bind(billsService), function(req, res) {
    res.json(req.bills.map(function(b){
    	return {
    		number: b.number,
    		title: b.title,
    		bill_uri: b.bill_uri,
    		gpo_pdf_uri: b.gpo_pdf_uri,
    		introduced_date: b.introduced_date,
    		active: b.active,
    		summary: b.summary,
    		actions: b.actions
    	}
    }));
});

//Example - http://localhost:3000/api/v1/bills/H.R.4881
billsRouter.get('/:number', function(req, res){
    res.json(req.bills);
});

billsRouter.param('number', function(req, res, next, billNumber){
    req.query.number = billNumber;
    billsService.queryBills(req, res, next);
});

module.exports = billsRouter;
