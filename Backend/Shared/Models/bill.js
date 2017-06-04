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
	sponsor_party: String,
    sponsor_state: String,
    gpo_pdf_uri: String,
    congressdotgov_url: String,
    govtrack_url: String,
    introduced_date: String,
    active: String,
    house_passage: String,
    senate_passage: String,
    enacted: String,
    vetoed: String,    
	cosponsors: String,
	primary_subject: String,
	committees: String,    
	latest_major_action_date: String,
	latest_major_action: String,
	last_vote_date: String,
	house_passage_vote: String,
	senate_passage_vote: String,
	summary: String,
    summary_short: String,
	versions: [],
	actions: [{}],
	//Added 
	tags: [],
    description: String
});

var Bill = mongoose.model("CurrentBill", BillSchema);
module.exports.Bill = Bill;


