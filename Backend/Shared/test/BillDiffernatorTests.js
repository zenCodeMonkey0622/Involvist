// stringParseTests.js
// unit tests against stringParse.js methods
'use strict';

const billDiffernator = require('../RousrData/BillDiffernator').BillDiffernator;
const assert = require('assert');

describe('BillDiffernator', function () {

    describe('diffBills()', function () {        

        it('should return null when oldBillData is null', function () {
            var actualResult = billDiffernator.diffBills(null, { "foo": "bar" });
            assert.equal(actualResult, null);
        });

        it('should return null when newBillData is null', function () {
            var actualResult = billDiffernator.diffBills({ "foo": "bar" }, null);
            assert.equal(actualResult, null);           
        });

        it('should return null when both inputs are null', function () {
            var actualResult = billDiffernator.diffBills(null, null);            
            assert.equal(actualResult, null);
        });        

       it('should return an object with all nulls, except the actions field', function () {           
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.votes = null;
           newData.votes = null;

           var actualResult = billDiffernator.diffBills(oldData, newData); 
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.actions.length, 16);            
       });
              
       it('should return an object with all nulls, except the house passage field', function () {           
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.actions = null;
           newData.actions = null;
           oldData.votes = null;
           newData.votes = null;
           newData.house_passage = "2017-01-20";

           var actualResult = billDiffernator.diffBills(oldData, newData);
           assert.notEqual(actualResult, null);
           assert.equal(actualResult.house_passage, "2017-01-20");
           assert.equal(Object.keys(actualResult).length, 1);           
       });
       it('should return an object with all nulls, except the senate passage field', function () {          
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.actions = null;
           newData.actions = null;
           oldData.votes = null;
           newData.votes = null;
           oldData.house_passage = "2017-01-20";
           newData.senate_passage = "2017-01-22";

           var actualResult = billDiffernator.diffBills(oldData, newData);
           assert.notEqual(actualResult, null);
           assert.equal(actualResult.senate_passage, "2017-01-22");
           assert.equal(Object.keys(actualResult).length, 1);
       });
       it('should return an object with all nulls, except the latest_major_action_date field', function () {           
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.actions = null;
           newData.actions = null;
           oldData.votes = null;
           newData.votes = null;
           oldData.senate_passage = "2017-01-22";
           newData.latest_major_action_date = "2017-01-21";

           var actualResult = billDiffernator.diffBills(oldData, newData);
           assert.notEqual(actualResult, null);
           assert.equal(actualResult.latest_major_action_date, "2017-01-21");
           assert.equal(Object.keys(actualResult).length, 1);
       });
       it('should return an object with all nulls, except the latest_major_action field', function () {           
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.actions = null;
           newData.actions = null;
           oldData.votes = null;
           newData.votes = null;
           oldData.latest_major_action_date = "2017-01-21";
           var actual_last_major_action = "Vampire Cruz says we should feed the old to the poor people and then ride them for transportation.";
           newData.latest_major_action = actual_last_major_action;

           var actualResult = billDiffernator.diffBills(oldData, newData);
           assert.notEqual(actualResult, null);
           assert.equal(actualResult.latest_major_action, actual_last_major_action);
           assert.equal(Object.keys(actualResult).length, 1);
       });
       it('should return an object with all nulls, except the last_vote_date field', function () {          
           var oldData = FakeData.billDataOld;
           var newData = FakeData.billDataRaw;
           oldData.actions = null;
           newData.actions = null;
           oldData.votes = null;
           newData.votes = null;
           oldData.latest_major_action = "Vampire Cruz says we should feed the old to the poor people and then ride them for transportation.";
           newData.last_vote_date = "2017-01-25";

           var actualResult = billDiffernator.diffBills(oldData, newData);
           assert.notEqual(actualResult, null);
           assert.equal(actualResult.last_vote_date, "2017-01-25");
           assert.equal(Object.keys(actualResult).length, 1);
       });
    });

});

var FakeData = {        
    billDataOld : {        
        "house_passage": "2017-01-03",
        "senate_passage": null,              
        "primary_subject": "Government Operations and Politics",       
        "latest_major_action_date": "2017-01-05",
        "latest_major_action": "Received in the Senate and Read twice and referred to the Committee on Homeland Security and Governmental Affairs.",
        "last_vote_date": "2017-01-04",            
        "actions":[       
                 {
                     "id": 3,
                     "chamber": "House",
                     "action_type": "Committee",
                     "datetime": "2017-01-03",
                     "description": "Referred to the Subcommittee on Regulatory Reform, Commercial And Antitrust Law."
                 },
                 {
                     "id": 2,
                     "chamber": "House",
                     "action_type": "IntroReferral",
                     "datetime": "2017-01-03",
                     "description": "Referred to House Rules"
                 },
                 {
                     "id": 1,
                     "chamber": "House",
                     "action_type": "IntroReferral",
                     "datetime": "2017-01-03",
                     "description": "Referred to House Judiciary"
                 }
        ],
        "votes": [         
          {
              "chamber": "House",
              "date": "2017-01-04",
              "time": "16:38:00",
              "roll_call": "7",
              "question": "On Motion to Recommit with Instructions",
              "result": "Failed",
              "total_yes": 183,
              "total_no": 236,
              "total_not_voting": 14,
              "api_url": "https://api.propublica.org/congress/v1/115/house/sessions/1/votes/7.json"
          }
        ]
    },

    billDataRaw : {
        "bill_id": "hr21-115",
        "congress": "115",
        "bill": "H.R.21",
        "bill_type": "hr",
        "number": "H.R.21",
        "bill_uri": "https://api.propublica.org/congress/v1/115/bills/hr21.json",
        "title": "Midnight Rules Relief Act of 2017",
        "sponsor_title": "Rep.",
        "sponsor": "Darrell Issa",
        "sponsor_id": "I000056",
        "sponsor_uri": "https://api.propublica.org/congress/v1/members/I000056.json",
        "sponsor_party": "R",
        "sponsor_state": "CA",
        "gpo_pdf_uri": "https://www.gpo.gov/fdsys/pkg/BILLS-115hr21rfs/pdf/BILLS-115hr21rfs.pdf",
        "congressdotgov_url": "https://www.congress.gov/bill/115th-congress/house-bill/21",
        "govtrack_url": "https://www.govtrack.us/congress/bills/115/hr21",
        "introduced_date": "2017-01-03",
        "active": true,
        "house_passage": "2017-01-03",
        "senate_passage": null,
        "enacted": null,
        "vetoed": null,
        "cosponsors": 14,
        "withdrawn_cosponsors": 0,
        "primary_subject": "Government Operations and Politics",
        "committees": "Senate Homeland Security and Governmental Affairs Committee",
        "committee_codes": ["SSGA","HSJU","HSRU"],
        "subcommittee_codes": ["HSJU05"],
        "latest_major_action_date": "2017-01-05",
        "latest_major_action": "Received in the Senate and Read twice and referred to the Committee on Homeland Security and Governmental Affairs.",
        "last_vote_date": "2017-01-04",
        "house_passage_vote": "2017-01-03",
        "senate_passage_vote": null,
        "summary": "(This measure has not been amended since it was introduced. The summary has been expanded because action occurred on the measure.) Midnight Rules Relief Act of 2017 (Sec. 2) This bill amends the Congressional Review Act to allow Congress to consider a joint resolution to disapprove multiple regulations that federal agencies have submitted for congressional review within the last 60 legislative days of a session of Congress during the final year of a President's term. Congress may disapprove a group of such regulations together (i.e., \"en bloc\") instead of the current procedure of considering only one regulation at a time.",
        "summary_short": "(This measure has not been amended since it was introduced. The summary has been expanded because action occurred on the measure.) Midnight Rules Relief Act of 2017 (Sec. 2) This bill amends the Congressional Review Act to allow Congress to consider a joint resolution to disapprove multiple regulations that federal agencies have submitted for congressional review within the last 60 legislative days of a session of Congress during the final year of a President's term. Congress may disapprove a...",
        "versions":[
        ],
        "actions":[
        {
            "id": 16,
            "chamber": "Senate",
            "action_type": "IntroReferral",
            "datetime": "2017-01-05",
            "description": "Received in the Senate and Read twice and referred to the Committee on Homeland Security and Governmental Affairs."
        },
                 {
                     "id": 15,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "Motion to reconsider laid on the table Agreed to without objection."
                 },
                 {
                     "id": 14,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "On passage Passed by recorded vote: 238 - 184 (Roll no. 8). (text: CR H74)"
                 },
                 {
                     "id": 13,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "On motion to recommit with instructions Failed by the Yeas and Nays: 183 - 236 (Roll no. 7)."
                 },
                 {
                     "id": 12,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "Considered as unfinished business. (consideration: CR H86-87)"
                 },
                 {
                     "id": 11,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "POSTPONED PROCEEDINGS - At the conclusion of debate on the Castor (FL) motion to recommit, the Chair put the question on adoption of the motion to recommit and by voice vote, announced that the noes had prevailed. Ms. Castor (FL) demanded the yeas and nays and the Chair postponed further proceedings on adoption of the motion to recommit until a time to be announced."
                 },
                 {
                     "id": 10,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "The previous question on the motion to recommit with instructions was ordered without objection."
                 },
                 {
                     "id": 9,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "DEBATE - The House proceeded with 10 minutes of debate on the Castor (FL) motion to recommit with instructions. The instructions contained in the motion seek to require the bill to be reported back to the House with an amendment to add at the end of the bill a section 3 pertaining to exception for certain rules that prohibit discrimination by insurance issuers on the basis of gender or preexisting condition or that make healthcare more affordable for working Americans."
                 },
                 {
                     "id": 8,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "Ms. Castor (FL) moved to recommit with instructions to the Committee on the Judiciary. (text: CR H84)"
                 },
                 {
                     "id": 7,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "The previous question was ordered pursuant to the rule."
                 },
                 {
                     "id": 6,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "DEBATE - The House proceeded with one hour of debate on H.R. 21."
                 },
                 {
                     "id": 5,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "The rule provides for one hour of debate and one motion to recommit."
                 },
                 {
                     "id": 4,
                     "chamber": "House",
                     "action_type": "Floor",
                     "datetime": "2017-01-04",
                     "description": "Considered under the provisions of rule H. Res. 5. (consideration: CR H74-86)"
                 },
                 {
                     "id": 3,
                     "chamber": "House",
                     "action_type": "Committee",
                     "datetime": "2017-01-03",
                     "description": "Referred to the Subcommittee on Regulatory Reform, Commercial And Antitrust Law."
                 },
                 {
                     "id": 2,
                     "chamber": "House",
                     "action_type": "IntroReferral",
                     "datetime": "2017-01-03",
                     "description": "Referred to House Rules"
                 },
                 {
                     "id": 1,
                     "chamber": "House",
                     "action_type": "IntroReferral",
                     "datetime": "2017-01-03",
                     "description": "Referred to House Judiciary"
                 }
        ],
        "votes": [
          {
              "chamber": "House",
              "date": "2017-01-04",
              "time": "16:48:00",
              "roll_call": "8",
              "question": "On Passage",
              "result": "Passed",
              "total_yes": 238,
              "total_no": 184,
              "total_not_voting": 11,
              "api_url": "https://api.propublica.org/congress/v1/115/house/sessions/1/votes/8.json"
          },
          {
              "chamber": "House",
              "date": "2017-01-04",
              "time": "16:38:00",
              "roll_call": "7",
              "question": "On Motion to Recommit with Instructions",
              "result": "Failed",
              "total_yes": 183,
              "total_no": 236,
              "total_not_voting": 14,
              "api_url": "https://api.propublica.org/congress/v1/115/house/sessions/1/votes/7.json"
          }
        ]
    }
};

