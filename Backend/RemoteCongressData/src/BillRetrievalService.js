// BillRetrievalService.js
// responsible for retrieving publically available legislative data
// via the ProPublica Congress API

'use strict';

var BillRetrievalNamespace = (function () {

	const http = require('http');
	const https = require('https');	
	const request = require('request');
	const schedule = require('node-schedule');
	const debugUtil = require('../../Shared/Debug/debugUtility');
	const httpUtility = require('../../Shared/ServiceAccess/httpUtility');
	const databaseService = require('../../Shared/RousrCongressData/RousrCongressDataService').RousrCongressDataService;
	const billRetrieveConfig = require('./config');
	const billRetrieveConstants = require('./constants');
	const MAX_RETRY_REQUESTS = 5;

    module.exports.BillRetriever = new BillRetriever();

	var bills = [];
	var congressMembers = [];
	var billsWithDetails = [];
	var retryRequestAttempts = 0;	
	var database = databaseService.createDatabase(billRetrieveConfig);

    /**
    * BillRetriever - Gets the latest bills and congress members data
    */
	function BillRetriever() 
	{
		this.congressDataAgentSecure = new https.Agent({keepAlive: true});
	}

    /**
   * startGetCongressMembersBillsSchedule - starts the bill scheduler
   */
	BillRetriever.prototype.startGetCongressMembersBillsSchedule = function() 
	{
		debugUtil.debugLog('Congress Data Retrieval Started...');
		var self = this;

		if(billRetrieveConfig.dataRetrieval.retrieveDataOnStartup) {
			self.getCongressMembersBills();
		}

		var rule = new schedule.RecurrenceRule();
		rule.dayOfWeek = [new schedule.Range(0, 6)];
		rule.hour = billRetrieveConfig.dataRetrieval.schedule.hour || 6;
		rule.minute = billRetrieveConfig.dataRetrieval.schedule.minute || 0;

		var minuteString = rule.minute < 10 ? '0' + rule.minute : rule.minute;

		debugUtil.debugLog('Retrieval scheduled for:  ' + rule.hour + ':' + minuteString);

		var j = schedule.scheduleJob(rule, function(){
  			self.getCongressMembersBills();
		});
	}

	/**
	* getCongressMembersBills() - Gets the latest bill information sponsored by each Congress member
	*/
	BillRetriever.prototype.getCongressMembersBills = function () {
	    billsWithDetails = [];
	    var self = this;
        
		this.getCongressMembers(function(err){
			if(err) {
			    return console.error(err.toString());
			}
			var count = 0;
			self.getAllCongressMembersBills(count);
	    });       
	}	

	/**
	* getCongressMembers() - Gets the latest information for each Congress member
	* @param <function()> next
	*/
	BillRetriever.prototype.getCongressMembers = function(next)
	{
	    this.getHouseMembers((houseError) => {
	        if (houseError) {
	            return next(houseError);
	        }
	        this.getSenateMembers((senateError) => {
	            if (senateError) {
	                return next(senateError);
	            }
	            debugUtil.debugLog('Got all congress members');
	            database.updateMembers(congressMembers, function (error) {
	                if (error) {
	                    return next(error);
	                }
	            });
	            next();
	        });
		});
	}

	/**
	* getAllCongressMembersBills() - Gets the latest bill information sponsored by a Congress member
	*/
	BillRetriever.prototype.getAllCongressMembersBills = function (count) {	    
	    if (count < congressMembers.length) {
	        var memberId = congressMembers[count].id;
	        this.getMemberIntroducedBills(memberId, (err) => {
	            if (err) {
	                debugUtil.debugLog(err.toString());
	            }
	            this.getMemberUpdatedBills(memberId, (err) => {
	                if (err) {
	                    debugUtil.debugLog(err.toString());
	                }
	                var newCount = count + 1;
	                debugUtil.debugLog('Member Count:  ' + newCount);
	                debugUtil.debugLog(congressMembers[count].first_name + ' ' + congressMembers[count].last_name);
	                this.getAllCongressMembersBills(newCount);
	            });
	        });
	    }
	}

	/**
	 * gets json formatted data on house members for the current congress.
	 * @param {function} next - the next middleware to call.
	 */
	BillRetriever.prototype.getHouseMembers = function(next)
	{
	    const getHouseMembersPath = billRetrieveConstants.BASE_CONGRESS_API_PATH + '/' + billRetrieveConstants.CURRENT_CONGRESS + '/' + 'house/members.json';
	    this.getRequest(getHouseMembersPath, processMembersData, next);		
	}

	/**
	 * gets json formatted data on senate members for the current congress.
	 * @param {function} next - the next middleware to call.
	 */
	BillRetriever.prototype.getSenateMembers = function(next)
	{
	    const getSenateMembersPath = billRetrieveConstants.BASE_CONGRESS_API_PATH + '/' + billRetrieveConstants.CURRENT_CONGRESS + '/' + 'senate/members.json';
	    this.getRequest(getSenateMembersPath, processMembersData, next);
	}

	/**
	* processMembersData() - Processes the response from the get members request
	* @param <Error> error
	* @param <{}> body
	* @param <function()> next
	*/
	function processMembersData (error, body, next) 
	{
	    if (error) 
		{
	        debugUtil.debugLog(error);
		    return next(error);
		}

		var info = JSON.parse(body);

		if(congressMembers.length == 0)
		{
			debugUtil.debugLog(info);
			congressMembers = info.results[0].members;
		}
		else
		{
			congressMembers = congressMembers.concat(info.results[0].members);
		}

		if (next)
		{
	    	next();
		}
	}	

	/*
    * getMemberIntroducedBills() - Gets bills introduced by the congress member
    */
	BillRetriever.prototype.getMemberIntroducedBills = function (memberId, next) {

	    var billsPath = billRetrieveConstants.BILLS_BY_MEMBER_URI + memberId + '/bills/introduced.json'	    
	    this.getRequest(billsPath, this.processMembersBillsData.bind(this), next);	   
	}

    /*
    * getMemberUpdatedBills() - Gets bills sponsored by the congress member that have been updated recently
    */
	BillRetriever.prototype.getMemberUpdatedBills = function (memberId, next) {

	    var billsPath = billRetrieveConstants.BILLS_BY_MEMBER_URI + memberId + '/bills/updated.json'	   
	    this.getRequest(billsPath, this.processMembersBillsData.bind(this), next);	    
	}

	/**
   * processMembersBillsData() - Processes the response from the get bills sponsored by each member of congress request
   * @param <Error> error
   * @param <{}> body
   * @param <function()> next
   */
	BillRetriever.prototype.processMembersBillsData = function (error, body, next) {	   
	    if (error) {
	        return next(error);
	    }

	    var self = this;

	    //There is some bad JSON data coming back from the Propublica Congress API, so we need to make sure active has a valid value.
	    try
		{
	        var parseBody = body.replace(new RegExp('\"active\": ,', 'g'), '\"active\": \"\",');
	        var info = JSON.parse(parseBody);

	        if (info.results[0].bills && info.results[0].bills.length > 0) {
	            //Only get bills that were introduced during the current congress.
	            var currentBills = info.results[0].bills.filter((bill) => bill.congress === billRetrieveConstants.CURRENT_CONGRESS);

	            if (currentBills && currentBills.length > 0) {	                
	                database.updateBills(currentBills, function (err) {
	                    if (err) {
	                        return next(err);
	                    }
	                    if (billRetrieveConstants.GET_SPECIFIC_BILL_DATA) {
	                        self.getSpecificBillsData(currentBills, next);
	                    }
	                    else {
	                        return next();
	                    }
	                });
	            }
	            else {
	                return next();
	            }
	        }
	        else {
	            return next();
	        }
	    }
	    catch (err) 
	    {	        
	        return next(err);
	    }
	}

	/**
	* getSpecificBillsData() - Gets the specific bill data for the members bills passed in	
	* @param <[{bill}]> memberBills
	* @param <function()> next
	*/
	BillRetriever.prototype.getSpecificBillsData = function(memberBills, next) {
	    var self = this;
	    memberBills.forEach(function (billData) {
	        var billNumber = billData.number.replace(/\./g, "").toLowerCase();

	        if (!billsWithDetails.includes(billNumber)) {
	            billsWithDetails.push(billNumber);
	            debugUtil.debugLog('Get Bill Details: ' + billNumber);
	            var billPath = billRetrieveConstants.SPECIFIC_BILL + billNumber + '.json';
	            self.getRequest(billPath, processSpecificBillData, next);
	        }
	    });

		next();
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

	    try {
	        var parseBody = data.replace(new RegExp('\"active\": ,', 'g'), '\"active\": \"\",');
	        var billInfo = JSON.parse(parseBody);

	        if(billInfo.status === 'OK') {
	            billInfo.results[0].number = billInfo.results[0].bill;
	            billInfo.results[0].name = billInfo.results[0].number.replace(/\./g, "").toLowerCase();

	            database.updateBills(billInfo.results, function(err) {
	                if(err) {
	                    return next(err);
	                }
	            });
	        }
	    }
	    catch (err) {
	        return next(data);
	    }
	}

	/**
	* getRequest() - Makes a http get request to the URI passed in
	* @param <String> getUri
	* @param <function()> processDataFunction - handles the return from the request
	* @param <function()> next
	*/	
	BillRetriever.prototype.getRequest = function(path, processDataFunction, next) {
		const httpRequest = httpUtility.makeHttpsRequest(billRetrieveConstants.CONGRESS_API_HOST_URI,
			null,
			path,
			httpUtility.requestType.GET,
			this.congressDataAgentSecure,
			null,
			httpUtility.contentType.JSON,
			{ 'X-API-Key': billRetrieveConstants.PROPUBLICA_API_KEY },
			(res) => {

		    var responseData = '';

		    res.on('data', (chunk) => {
		        responseData += chunk;
		    });

		    res.on('end', () => {		        
		        if (res.statusCode === 408) {
		            console.error('Request Timeout:  ' + path + 'trying again...');
		            
		            //Request timed out...try the call again
		            if (retryRequestAttempts < MAX_RETRY_REQUESTS) {
		                retryRequestAttempts++;
		                return getRequest(path, processDataFunction, next);
		            }
		            retryRequestAttempts = 0;                    
		        }
		        else if (res.statusCode != 200) {		            
		            var err = new Error(responseData);		            
		            return next(err);
		        }
		        else {		            
		            processDataFunction(null, responseData, next);
		        }
		    });
		});

	    httpRequest.on('error', (e) => {
	        console.error('problem with get congress members request: ' + e.message);
	        return next(e);
	    });

	    httpRequest.end();
	}    





	



	/** The following methods are not being used. Commenting out. -RR. */

	/**
	* getRecentBills() - Gets the latest bills of each bill type for the house and senate
	*/
	// BillRetriever.prototype.getRecentBills = function (){
	// 	var count = 0;
	// 	getRecentHouseBills(count, function(houseErr){
	// 		if(houseErr) {
	// 				console.error(houseErr.toString());
	// 		}
	// 		var senateBillCount = 0;
	// 		getRecentSenateBills(senateBillCount, function(senateErr) {
	// 			if(senateErr) {
	// 			    console.error(senateErr.toString());
	// 			}
	// 			else if(bills){
	// 				debugUtil.debugLog('Bills Length:  ' + bills.length);
	// 				database.updateBills(bills, function(err) {
	// 					if(err) {
	// 					    console.error(err.toString());
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
	// }

    /**
	* getRecentHouseBills() - Gets the latest bills from the house
	* @param <number> count - index of the current bill type
	*/
	// BillRetriever.prototype.getRecentHouseBills = function(count, next) {
	//     if (count < constants.BILL_TYPES.length) {
	//         debugUtil.debugLog('HOUSE BILLS for type: ' + constants.BILL_TYPES[count]);
	//         getRequest(constants.HOUSE_BILLS_URI + constants.BILL_TYPES[count] + '.json', processRecentBillsData, function () {
	//             var newCount = count + 1;
	//             debugUtil.debugLog('Count:  ' + newCount);
	//             getRecentHouseBills(newCount, next);
	//         });
	//     }
	//     else {
	//         next();
	//     }
	// }

    /**
	* getRecentSenateBills() - Gets the latest bills from the senate
	* @param <number> count - index of the current bill type
	*/
	// BillRetriever.prototype.getRecentSenateBills = function(count, next) {
	//     if (count < constants.BILL_TYPES.length) {
	//         debugUtil.debugLog('SENATE BILLS: ' + constants.BILL_TYPES[count]);
	//         getRequest(constants.SENATE_BILLS_URI + constants.BILL_TYPES[count] + '.json', processRecentBillsData, function (err) {
	//             if (err) {
	//                 return next(err);
	//             }
	//             var newCount = count + 1;
	//             debugUtil.debugLog('Count:  ' + newCount);
	//             getRecentSenateBills(newCount, next);
	//         });
	//     }
	//     else {
	//         next();
	//     }
	// }

    /**
   * getBill() - Gets the bill
   * @param <number> billNumber - the bill number
   */
	// BillRetriever.prototype.getBill = function (billNumber) {
	//     var query = { number: billNumber };
	//     database.queryBills(query, function (err, docs) {
	//         return docs;
	//     });
	// }

    /**
   * getMember() - Gets the congress member
   * @param <number> memberId - the ID of the congress member
   */
	// BillRetriever.prototype.getMember = function (memberId) {
	//     var query = { id: memberId };
	//     database.queryMembers(query, function (err, docs) {
	//         return docs;
	//     });
	// }

	/**
	* processRecentBillsData() - Processes the response from the get recent bills request
	* @param <Error> error
	* @param <{}> body
	* @param <function()> next
	*/
	// function processRecentBillsData (error, body, next) {
	// 	if(error) {
	// 		return next(error);
	// 	}

	// 	var info = JSON.parse(body);

	// 	if(bills.length == 0){
	// 		bills = info.results[0].bills;
	// 	}
	// 	else{
	// 		bills = bills.concat(info.results[0].bills);
	// 	}

	//    	bills.sort(sortBills);

	//     next();
	// }

	/**
	* sortBills() - sorts the bills by introduced_data
	* <{Bill}> a
	* <{Bill}> b
	* Returns
	*	- negative if a before b
	*	0 no change
	*	+ positive a after b
	*/
	// function sortBills(a, b) {
	// 	var bDate = new Date(b.introduced_date);
	// 	var aDate = new Date(a.introduced_date);
	// 	return bDate - aDate;
	// }

})();
