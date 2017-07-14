'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Obtained from List of Members...Get Specific Member has other data
var CongressMemberSchema = new Schema ({
	id: String,
  	thomas_id: String,
  	api_uri: String,
  	first_name: String,
  	middle_name: String,
  	last_name: String,
  	party: String,
  	twitter_account: String,
  	facebook_account: String,
  	facebook_id: String,
  	url: String,
  	rss_url: String,
  	domain: String,
  	dw_nominate: String,
  	ideal_point: String,
  	seniority: String,
  	next_election: String,
  	total_votes: String,
  	missed_votes: String,
  	total_present: String,
  	state: String,
  	missed_votes_pct: String,
  	votes_with_party_pct: String,
  	//Added 
  	chamber: String,
  	congress: String
});

var CongressMember = mongoose.model("rsr_congress_member", CongressMemberSchema);
module.exports.CongressMember = CongressMember;

