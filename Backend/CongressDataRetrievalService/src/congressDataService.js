'use strict'

var BillRetrieverNamespace = (function () {

	var request = require('request');
	var schedule = require('node-schedule');
	var databaseFactory = require("./databaseService").DatabaseFactory;
	var config = require('./config');

	//Setting this to false will make the retrieval of data much faster
	var GET_SPECIFIC_BILL_DATA = true;

	var PROPUBLICA_API_KEY = 'BQ03NR8CIK2paMdsiI2m05hBMiuGyyEY3jXJCLbp';
	var BASE_CONGRESS_API_URI = 'https://api.propublica.org/congress/v1/';
	var CURRENT_CONGRESS = 115;
	var BILL_TYPES = ['introduced', 'updated', 'passed', 'major'];
	var HOUSE_BILLS_URI = BASE_CONGRESS_API_URI + CURRENT_CONGRESS + '/' + 'house/bills/';
	var SENATE_BILLS_URI = BASE_CONGRESS_API_URI + CURRENT_CONGRESS + '/' + 'senate/bills/';
	var HOUSE_MEMBERS_URI = BASE_CONGRESS_API_URI + CURRENT_CONGRESS + '/' + 'house/members';
	var SENATE_MEMBERS_URI = BASE_CONGRESS_API_URI + CURRENT_CONGRESS + '/' + 'senate/members';
	var BILLS_BY_MEMBER_URI = BASE_CONGRESS_API_URI + 'members/';
	var SPECIFIC_BILL = BASE_CONGRESS_API_URI + CURRENT_CONGRESS + '/bills/'; 

	var bills = [];
	var congressMembers = [];
	var billsWithDetails = [];

	var database = databaseFactory.createDatabase({databaseType: 'mongodb'});

	//Expose "public class" - BillRetriever
	return{
		/**
		* BillRetriever - Gets the latest bills and congress members data
		*/
		BillRetriever : {	

			StartGetCongressMembersBillsSchedule: function() {
				console.log("Congress Data Retrieval Started...");
				var self = this;				

				if(config.dataRetrieval.retrieveDataOnStartup) {
					self.GetCongressMembersBills();
				}

				var rule = new schedule.RecurrenceRule();
				rule.dayOfWeek = [new schedule.Range(0, 6)];
				rule.hour = config.dataRetrieval.schedule.hour || 6;
				rule.minute = config.dataRetrieval.schedule.minute || 0;

				var minuteString = rule.minute < 10 ? '0' + rule.minute : rule.minute;

				console.log("Retrieval scheduled for:  " + rule.hour + ':' + minuteString);

				var j = schedule.scheduleJob(rule, function(){
  					self.GetCongressMembersBills();
				});
			},

			/**
			* GetRecentBills() - Gets the latest bills of each bill type for the house and senate
			*/
			GetRecentBills: function (){	
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
							console.log("Bills Length:  " + bills.length);
							database.UpdateBills(bills, function(err) {
								if(err) {
									console.error(err);
								}
							});			
						}
					});
				});
			},

			/**
			* GetCongressMembers() - Gets the latest information for each Congress member
			* @param <function()> next
			*/
			GetCongressMembers: function(next){
				getRequest(HOUSE_MEMBERS_URI + '.json', processMembersData, function(houseErr){
					if(houseErr) {
						return next(houseErr);
					}
					getRequest(SENATE_MEMBERS_URI + '.json', processMembersData, function(senateErr){
						if(senateErr) {
							return next(senateErr);
						}
						console.log("Got all congress members");
						database.UpdateMembers(congressMembers, function(error){
							if(error) {
								return next(error);
							}
						});

						next();
					});
				});
			},

			/**
			* GetCongressMembersBills() - Gets the latest bill information sponsored by each Congress member			
			*/
			GetCongressMembersBills: function () {
				billsWithDetails = [];

				this.GetCongressMembers(function(err){
					if(err) {
						return console.error(err);
					}
					var count = 0;
					getAllCongressMembersBills(count);
				});
			},

			GetBill : function(billNumber)	
			{
				var query = {number: billNumber};
				database.QueryBills(query, function(err, docs){
					return docs;
				});
			},

			GetMember : function(memberId) {
				var query = {id: memberId};
				database.QueryMembers(query, function(err, docs){
					return docs;
				});
			}

		}
	};

//********************************** "Private Functions" ************************************
	// For the time now
	function  timeNow () {
		var now = new Date();

     	return ((now.getHours() < 10)?"0":"") + now.getHours() +":"+ ((now.getMinutes() < 10)?"0":"") + now.getMinutes() +":"+ ((now.getSeconds() < 10)?"0":"") + now.getSeconds();
	}

	/**
	* getAllCongressMembersBills() - Gets the latest information for each Congress member
	* @param <number> count - index of the current congress member to get sponsored bills
	*/
	function getAllCongressMembersBills(count) {
		console.log('Start Time:  ' + timeNow());
		if(count < congressMembers.length){
			getRequest(BILLS_BY_MEMBER_URI + congressMembers[count].id + '/bills/' + BILL_TYPES[0]  + '.json', processMembersBillsData, function(error) {
				if(error) {
					return console.error(error);
				}
				getRequest(BILLS_BY_MEMBER_URI + congressMembers[count].id + '/bills/' + BILL_TYPES[1]  + '.json', processMembersBillsData, function(err) {
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
		else {
			console.log('End Time:  ' + timeNow());
		}
}
	
	/**
	* getRecentHouseBills() - Gets the latest bills from the house
	* @param <number> count - index of the current bill type
	*/
	function getRecentHouseBills(count, next) {
		if(count < BILL_TYPES.length) {
			console.log('HOUSE BILLS for type: ' + BILL_TYPES[count]);
			getRequest(HOUSE_BILLS_URI + BILL_TYPES[count] + '.json', processRecentBillsData, function(){
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
		if(count < BILL_TYPES.length){
			console.log('SENATE BILLS: ' + BILL_TYPES[count]);
			getRequest(SENATE_BILLS_URI + BILL_TYPES[count] + '.json', processRecentBillsData, function(err){
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
				console.log("GetDetails:  " + billNumber);
				getRequest(SPECIFIC_BILL + billNumber + '.json', processSpecificBillData, function(err) {
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
			var billNumber = billData.number.replace(/\./g, "").toLowerCase();
			
			if(!billsWithDetails.includes(billNumber)) {
				billsWithDetails.push(billNumber);
				console.log("GetDetails:  " + billNumber);
				getRequest(SPECIFIC_BILL + billNumber + '.json', processSpecificBillData, function(err) {
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
		            'X-API-Key': PROPUBLICA_API_KEY
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
		if(error) {
			return next(error);
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

		var info = JSON.parse(body);
		
		if(info.results[0].bills && info.results[0].bills.length > 0){
			database.UpdateBills(info.results[0].bills, function(err){				
				if(err) {
					return next(err);
				}
				if(GET_SPECIFIC_BILL_DATA){							
					var count = 0;			
					return getSpecificBillsData(count, info.results[0].bills, next);	
				}				
			});		
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
			database.UpdateBills(billInfo.results, function(err) {
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

module.exports.BillRetriever = BillRetrieverNamespace.BillRetriever;