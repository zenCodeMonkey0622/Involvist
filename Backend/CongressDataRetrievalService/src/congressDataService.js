'use strict'

var BillRetrieverNamespace = (function () {

	const httpUtility = require('../../Shared/ServiceAccess/httpUtility');
	const http = require('http');
	const https = require('https');

    module.exports.BillRetriever = new BillRetriever();

	var request = require('request');
	var schedule = require('node-schedule');
	var databaseFactory = require('../../Shared/CongressDataClient/CongressDataLocalService').DatabaseFactory;
	var config = require('./config');
	var constants = require('./constants');

	var bills = [];
	var congressMembers = [];
	var billsWithDetails = [];

	var database = databaseFactory.createDatabase(config);

    /**
    * BillRetriever - Gets the latest bills and congress members data
    */
	function BillRetriever() 
	{
		this.congressDataAgentSecure = new https.Agent({keepAlive: true});
	}

	BillRetriever.prototype.startGetCongressMembersBillsSchedule = function() 
	{
		console.log('Congress Data Retrieval Started...');
		var self = this;

		if(config.dataRetrieval.retrieveDataOnStartup) {
			self.getCongressMembersBills();
		}

		var rule = new schedule.RecurrenceRule();
		rule.dayOfWeek = [new schedule.Range(0, 6)];
		rule.hour = config.dataRetrieval.schedule.hour || 6;
		rule.minute = config.dataRetrieval.schedule.minute || 0;

		var minuteString = rule.minute < 10 ? '0' + rule.minute : rule.minute;

		console.log('Retrieval scheduled for:  ' + rule.hour + ':' + minuteString);

		var j = schedule.scheduleJob(rule, function(){
  			self.getCongressMembersBills();
		});
	}

	/**
	* getRecentBills() - Gets the latest bills of each bill type for the house and senate
	*/
	BillRetriever.prototype.getRecentBills = function (){
		var count = 0;
		getRecentHouseBills(count, function(houseErr){
			if(houseErr) {
					console.error(houseErr);
			}
			var senateBillCount = 0;
			getRecentSenateBills(senateBillCount, function(senateErr) {
				if(senateErr) {
					console.error(senateErr);
				}
				if(bills){
					console.log('Bills Length:  ' + bills.length);
					database.updateBills(bills, function(err) {
						if(err) {
							console.error(err);
						}
					});
				}
			});
		});
	}

	/**
	* getCongressMembers() - Gets the latest information for each Congress member
	* @param <function()> next
	*/
	BillRetriever.prototype.getCongressMembers = function(next)
	{
		const memberRequest = httpUtility.makeHttpsRequest(constants.CONGRESS_API_HOST_URI,
		constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/' + 'house/members.json',
		httpUtility.requestType.GET,
		this.congressDataAgentSecure,
		null,
		null,
		{'X-API-Key': constants.PROPUBLICA_API_KEY},
		(resp) => {
			var responseData = '';

			res.on('data', (chunk) => {
				responseData += chunk;
			});

			res.on('end', () => {
				console.log('registerNewUser response body end: ' + responseData);

				if (res.statusCode != '200')
				{
					var frErr = frameError(responseData);
					return next(frErr);
				}
				else
				{
					// todo
				}
			});
		});

		memberRequest.on('error', (e) => {
			console.error('problem with get congress members request: ' + e.message);
			return next(e);
		});

		/*
	    getRequest(constants.HOUSE_MEMBERS_URI + '.json', processMembersData, function (houseErr) {
			if(houseErr) {
				return next(houseErr);
			}
			getRequest(constants.SENATE_MEMBERS_URI + '.json', processMembersData, function (senateErr) {
				if(senateErr) {
					return next(senateErr);
				}
				console.log('Got all congress members');
				database.updateMembers(congressMembers, function(error){
					if(error) {
						return next(error);
					}
				});

				next();
			});
		});
		*/
	}

	/**
	* getCongressMembersBills() - Gets the latest bill information sponsored by each Congress member
	*/
	BillRetriever.prototype.getCongressMembersBills = function () {
		billsWithDetails = [];

		this.getCongressMembers(function(err){
			if(err) {
				return console.error(err);
			}
			var count = 0;
			getAllCongressMembersBills(count);
		});
	}

	BillRetriever.prototype.getBill = function(billNumber)
	{
		var query = {number: billNumber};
		database.queryBills(query, function(err, docs){
			return docs;
		});
	}

	BillRetriever.prototype.getMember = function(memberId) {
		var query = {id: memberId};
		database.queryMembers(query, function(err, docs){
			return docs;
		});
	}

//********************************** "Private Functions" ************************************
	// For the time now...good for debugging
	function  timeNow () {
		var now = new Date();

     	return ((now.getHours() < 10)?'0':'') + now.getHours() +":"+ ((now.getMinutes() < 10)?'0':'') + now.getMinutes() +':'+ ((now.getSeconds() < 10)?'0':'') + now.getSeconds();
	}

	/**
	* getAllCongressMembersBills() - Gets the latest information for each Congress member
	* @param <number> count - index of the current congress member to get sponsored bills
	*/
	function getAllCongressMembersBills(count) {
		if(count < congressMembers.length){
		    getRequest(constants.BILLS_BY_MEMBER_URI + congressMembers[count].id + '/bills/' + constants.BILL_TYPES[0] + '.json', processMembersBillsData, function (error) {
				if(error) {
					return console.error(error);
				}
				getRequest(constants.BILLS_BY_MEMBER_URI + congressMembers[count].id + '/bills/' + constants.BILL_TYPES[1] + '.json', processMembersBillsData, function (err) {
					if(err) {
						return console.error(err);
					}
					var newCount = count + 1;
					console.log('Member Count:  ' + newCount);
					console.log(congressMembers[count].first_name + ' ' + congressMembers[count].last_name)
					getAllCongressMembersBills(newCount);
				});
			});
		}
	}

	/**
	* getRecentHouseBills() - Gets the latest bills from the house
	* @param <number> count - index of the current bill type
	*/
	function getRecentHouseBills(count, next) {
	    if (count < constants.BILL_TYPES.length) {
	        console.log('HOUSE BILLS for type: ' + constants.BILL_TYPES[count]);
	        getRequest(constants.HOUSE_BILLS_URI + constants.BILL_TYPES[count] + '.json', processRecentBillsData, function () {
				var newCount = count + 1;
				console.log('Count:  ' + newCount);
				getRecentHouseBills(newCount, next);
			});
		}
		else{
			next();
		}
	}

	/**
	* getRecentHouseBills() - Gets the latest bills from the senate
	* @param <number> count - index of the current bill type
	*/
	function getRecentSenateBills(count, next) {
	    if (count < constants.BILL_TYPES.length) {
	        console.log('SENATE BILLS: ' + constants.BILL_TYPES[count]);
	        getRequest(constants.SENATE_BILLS_URI + constants.BILL_TYPES[count] + '.json', processRecentBillsData, function (err) {
				if(err){
					return next(err);
				}
				var newCount = count + 1;
				console.log('Count:  ' + newCount);
				getRecentSenateBills(newCount, next);
			});
		}
		else{
			next();
		}
	}

	/**
	* getSpecificBillsData_old() - Gets the specific bill data for the members bills passed in
	* @param <number> count - NOT USED
	* @param <[{bill}]> memberBills
	* @param <function()> next
	*/
	function getSpecificBillsData(count, memberBills, next) {
		memberBills.forEach(function(billData){
			var billNumber = billData.number.replace(/\./g, "").toLowerCase();

			if(!billsWithDetails.includes(billNumber)) {
				billsWithDetails.push(billNumber);
				getRequest(constants.SPECIFIC_BILL + billNumber + '.json', processSpecificBillData, function (err) {
					if(err) {
						return next(err);
					}
				});
			}
		})

		next();
	}

	/**
	* getSpecificBillsData_NonAsync() - NOT USED - Gets the specific bill data for the members bills passed in.  Waits for the request to finish before making the next one through recursion
	* @param <number> count - the index of the current bill
	* @param <[{bill}]> memberBills
	* @param <function()> next
	*/
	function getSpecificBillsData_NonAsync(count, memberBills, next) {
		if(count < memberBills.length) {
			var billData = memberBills[count];
			var billNumber = billData.number.replace(/\./g, '').toLowerCase();

			if(!billsWithDetails.includes(billNumber)) {
				billsWithDetails.push(billNumber);
				console.log('GetDetails:  ' + billNumber);
				getRequest(constants.SPECIFIC_BILL + billNumber + '.json', processSpecificBillData, function (err) {
					if(err) {
						return next(err);
					}

					var billCounter = count + 1;
					getSpecificBillsData(billCounter, memberBills, next);
				});
			}
			else {
				next();
			}
		}
		else{
			next();
		}

	}



//***************** Helper  Functons ********************

	/**
	* getRequest() - Makes a http get request to the URI passed in
	* @param <String> getUri
	* @param <function()> processDataFunction - handles the return from the request
	* @param <function()> next
	*/
	function getRequest (getUri, processDataFunction, next) {
		var options = {
		    uri : getUri,
		    method : 'GET',
		    headers: {
		        'X-API-Key': constants.PROPUBLICA_API_KEY
		    }
	    }

	    request(options, function (error, response, body) {
	        if(error){
	        	return processDataFunction(new Error('Request Error: ' + error + ' URI:  ' + getUri));
	        }
	        else if (response.statusCode === 200) {
	        	response = body;
	        	return processDataFunction(null, body, next);

	        }
	        else if(response.statusCode === 408) {
	        	console.error('Request Timeout:  ' + getUri + 'trying again...');

	        	//TODO: Need to set a limit on how many times to make request again.
	        	//Request timed out...try the call again
	        	return getRequest(getUri, processDataFunction, next);
	        }

	        if(next) {
            	next();
            }
	    });
	}

	/**
	* processRecentBillsData() - Processes the response from the get recent bills request
	* @param <Error> error
	* @param <{}> body
	* @param <function()> next
	*/
	function processRecentBillsData (error, body, next) {
		if(error) {
			return next(error);
		}

		var info = JSON.parse(body);

		if(bills.length == 0){
			bills = info.results[0].bills;
		}
		else{
			bills = bills.concat(info.results[0].bills);
		}

	   	bills.sort(sortBills);

	    next();

	    //TEST CODE - "map" acts like a linq extension method
	   /* console.log(bills.map(function(obj){
	    	var viewData = obj.number;
	    	return viewData;
	    }));	*/
	}

	/**
	* processMembersData() - Processes the response from the get members request
	* @param <Error> error
	* @param <{}> body
	* @param <function()> next
	*/
	function processMembersData (error, body, next) {
	    if (error) {
	        console.log(error);
			//return next(error);
		}

		var info = JSON.parse(body);

		if(congressMembers.length == 0){
			console.log(info);
			congressMembers = info.results[0].members;
		}
		else{
			congressMembers = congressMembers.concat(info.results[0].members);
		}

	    next();
	}

	/**
	* processMembersBillsData() - Processes the response from the get bills sponsored by each member of congress request
	* @param <Error> error
	* @param <{}> body
	* @param <function()> next
	*/
	function processMembersBillsData (error, body, next) {
		if(error) {
			return next(error);
		}

        //There is some bad JSON data coming back from the Propublica Congress API, so we need to make sure active has a valid value.
		var parseBody = body.replace(new RegExp('\"active\": ,', 'g'), '\"active\": \"\",');
		var info = JSON.parse(parseBody);

		if (info.results[0].bills && info.results[0].bills.length > 0) {
            //Only get bills that were introduced during the current congress.
		    var currentBills = info.results[0].bills.filter((bill) => bill.congress === constants.CURRENT_CONGRESS);
		    if (currentBills && currentBills.length > 0) {
		        console.log('bills length: ' + currentBills.length + ' congress: ' + currentBills[0].congress);
		        database.updateBills(currentBills, function (err) {
		            if (err) {
		                return next(err);
		            }
		            if (constants.GET_SPECIFIC_BILL_DATA) {
		                var count = 0;
		                return getSpecificBillsData(count, info.results[0].bills, next);
		            }
		        });
		    }
		    else {
		        next();
		    }
		}
		else {
			next();
		}
	}

	/**
	* processSpecificBillData() - Processes the response from the get specific details of a bill request
	* @param <Error> error
	* @param <{}> data
	* @param <function()> next
	*/
	function processSpecificBillData(error, data, next) {
		if(error) {
			if(next) {
				return next(error);
			}
			else {
				return	console.error(error);
			}
		}

		var billInfo = JSON.parse(data);

		if(billInfo.status === 'OK') {
			billInfo.results[0].number = billInfo.results[0].bill;
			database.updateBills(billInfo.results, function(err) {
				if(err) {
					return next(err);
				}
			});
		}

		next();
	}

	/**
	* sortBills() - sorts the bills by introduced_data
	* <{Bill}> a
	* <{Bill}> b
	* Returns
	*	- negative if a before b
	*	0 no change
	*	+ positive a after b
	*/
	function sortBills(a, b) {
		var bDate = new Date(b.introduced_date);
		var aDate = new Date(a.introduced_date);
		return bDate - aDate;
	}
})();
