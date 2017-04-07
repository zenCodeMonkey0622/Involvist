'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Information from get Bills by congressman and specific details
var BillSchema = new Schema({
	congress: String,
	number: String,
	bill: String,
	bill_uri: String,
	title: String,
	sponsor: String,
	sponsor_id: String,
	sponsor_uri: String,
	gpo_pdf_uri: String,
	introduced_date: String,
	cosponsors: String,
	primary_subject: String,
	committees: String,
	latest_major_action_date: String,
	latest_major_action: String,
	house_passage_vote: String,
	senate_passage_vote: String,
	versions: [],
	actions: [{}],
	//Added 
	tags: [],
    description: String
});

var Bill = mongoose.model("Bill", BillSchema);
module.exports.Bill = Bill;


