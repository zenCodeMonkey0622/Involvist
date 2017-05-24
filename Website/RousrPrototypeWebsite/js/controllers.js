
var involvistClientDataUrl = 'http://localhost:3000/api/v1/bills';
var involvistAuthorization = 'Bearer 14f9ca00-eb0f-4273-b384-e995df8d0bf0';


app.controller('billsController', [
    '$scope', '$timeout', '$q', '$http', 
    function ($scope, $timeout, $q, $http) {
        $scope.model = {            
            result: 'Ready',
        };
        
        $scope.getBills = getBills;        
        $scope.followBill = followBill;
        $scope.getAllBills = getAllBills;

        function followBill(bill) {
            globalTrackedBills.push(bill);
        }

        $scope.getAllBills();
            
        function getBills(billQuery) {
            $scope.model.bills = null;
            if ($scope.model.allBills) {
                $scope.model.bills = $scope.model.allBills.filter(function (item) {
                    return item.summary.toLowerCase().includes(billQuery.toLowerCase()) | item.number.toLowerCase().includes(billQuery.toLowerCase());
                })
            }           
        }

        function queryBills(billQuery) {
            $http.get(involvistClientDataUrl + '?q=' + billQuery + '&congress=115&active=true&client_id=1', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 14f9ca00-eb0f-4273-b384-e995df8d0bf0'
                }
            })
                .then(function (response) {
                    $scope.model.legislators = null;
                    $scope.model.billDetails = null;
                    $scope.model.legislatorDetails = null;
                    $scope.model.bills = response.data;
                    $scope.model.bills.sort(function (a, b) {
                        return new Date(b.introduced_date) - new Date(a.introduced_date); 
                    });
                }, function (response) {
                    $scope.model.billDetails = null;
                    $scope.model.legislatorDetails = null;
                    $scope.model.bills = 'Error: ' + response.data.message;
                });
        }

        function getAllBills() {
            $http.get(involvistClientDataUrl + '?congress=115&active=true&client_id=1', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 14f9ca00-eb0f-4273-b384-e995df8d0bf0'
                }
            })
                .then(function (response) {
                    $scope.model.legislators = null;
                    $scope.model.billDetails = null;
                    $scope.model.legislatorDetails = null;
                    $scope.model.allBills = response.data;
                    $scope.model.allBills.sort(function (a, b) {
                        return new Date(b.introduced_date) - new Date(a.introduced_date);
                    });
                }, function (response) {
                    $scope.model.billDetails = null;
                    $scope.model.legislatorDetails = null;
                    $scope.model.bills = 'Error: ' + response.data.message;
                });
        }      
    }
]);

//To have access to fake data
app.controller('trackedBillsController', 
    function ($scope) {
        $scope.model = {
            result: 'Ready',
            trackedBills: globalTrackedBills
        };      
    }
);

//For pretty tooltips
angular.module('ui.bootstrap.tooltip')
.directive('tooltipSpecialPopup', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
        templateUrl: 'tooltip.tpl.html'
    };
})

.directive('tooltipSpecial', ['$tooltip', function ($tooltip) {
    return $tooltip('tooltipSpecial', 'tooltip', 'mouseenter');
}]);

//Handles the 'Enter' key in the bill query text input.
$('#billQueryText').keyup(function (event) {
    if (event.keyCode == 13) {
        $('#billQueryButton')[0].click();
    }
});

//Fake-Data for bill tracking, until the API can handle it.
var globalTrackedBills = [
              {
                  "_id": "58f65b561337b5ab1e1c2ed8",
                  "number": "H.RES.30",
                  "congress": "115",
                  "bill_uri": "https://api.propublica.org/congress/v1/115/bills/hres30.json",
                  "title": "Condemning the Dog Meat Festival in Yulin, China, and urging China to end the dog meat trade.",
                  "sponsor_id": "H000324",
                  "sponsor_uri": "https://api.propublica.org/congress/v1/members/H000324.json",
                  "gpo_pdf_uri": "https://www.gpo.gov/fdsys/pkg/BILLS-115hres30ih/pdf/BILLS-115hres30ih.pdf",
                  "congressdotgov_url": "https://www.congress.gov/bill/115th-congress/house-resolution/30",
                  "govtrack_url": "https://www.govtrack.us/congress/bills/115/hres30",
                  "introduced_date": "January  6, 2017",
                  "active": "false",
                  "house_passage": "",
                  "senate_passage": "",
                  "enacted": "",
                  "vetoed": "",
                  "cosponsors": "138",
                  "committees": "House Foreign Affairs Committee",
                  "primary_subject": "International Affairs",
                  "summary": "Condemns the Dog Meat Festival in Yulin, China, because it: (1) is a spectacle of extreme animal cruelty, (2) is a commercial activity not grounded in Chinese history, (3) is opposed by a majority of the Chinese people, and (4) threatens global public health.  Urges:   the government of China and the Yulin authorities to ban the killing and eating of dogs as part of Yulin's festival and to enforce China's food safety laws regulating the processing and sale of animal products and the 2011 Agriculture Ministry of China Regulation on the Quarantine of Dogs at the Place of Origin requiring one certificate for one dog on trans-provincial transport trucks, and the National People's Congress of China to enact an animal anticruelty law that bans the dog meat trade.   Affirms the commitment of the United States to the protection of animals and to the progress of animal protection.",
                  "summary_short": "Condemns the Dog Meat Festival in Yulin, China, because it: (1) is a spectacle of extreme animal cruelty, (2) is a commercial activity not grounded in Chinese history, (3) is opposed by a majority of the Chinese people, and (4) threatens global public health.  Urges:   the government of China and the Yulin authorities to ban the killing and eating of dogs as part of Yulin&#39;s festival and to enforce China&#39;s food safety laws regulating the processing and sale of animal products and the 2011 Agri...",
                  "latest_major_action_date": "February 16, 2017",
                  "latest_major_action": "Referred to the Subcommittee on Asia and the Pacific.",
                  "__v": 0,
                  "bill": "H.RES.30",
                  "sponsor": "Alcee L. Hastings",
                  "sponsor_party": "D",
                  "sponsor_state": "FL",
                  "last_vote_date": "",
                  "house_passage_vote": null,
                  "senate_passage_vote": null,
                  "tags": [],
                  "actions": [
                    {
                        "description": "Referred to the Subcommittee on Asia and the Pacific.",
                        "datetime": "2017-02-16 00:00:00 UTC"
                    },
                    {
                        "description": "Referred to the House Committee on Foreign Affairs.",
                        "datetime": "2017-01-06 00:00:00 UTC"
                    }
                  ],
                  "versions": []
              },
              {
                  "_id": "58f6645d1337b5ab1e1c4547",
                  "number": "H.CON.RES.46",
                  "congress": "115",
                  "bill_uri": "https://api.propublica.org/congress/v1/115/bills/hconres46.json",
                  "title": "Expressing support for the designation of a 'National Purebred Dog Day'.",
                  "sponsor_id": "Y000065",
                  "sponsor_uri": "https://api.propublica.org/congress/v1/members/Y000065.json",
                  "gpo_pdf_uri": "https://www.gpo.gov/fdsys/pkg/BILLS-115hconres46ih/pdf/BILLS-115hconres46ih.pdf",
                  "congressdotgov_url": "https://www.congress.gov/bill/115th-congress/house-concurrent-resolution/46",
                  "govtrack_url": "https://www.govtrack.us/congress/bills/115/hconres46",
                  "introduced_date": "April  4, 2017",
                  "active": "false",
                  "house_passage": "",
                  "senate_passage": "",
                  "enacted": "",
                  "vetoed": "",
                  "cosponsors": "2",
                  "committees": "House Oversight and Government Reform Committee",
                  "primary_subject": "Animals",
                  "summary": "&lt;p&gt;The idea of a National Purebred Dog Day is absolutely redonk, considering all the dogs in shelters that all ready need homes.",
                  "summary_short": "",
                  "latest_major_action_date": "April  4, 2017",
                  "latest_major_action": "Referred to the House Committee on Oversight and Government Reform.",
                  "__v": 0,
                  "bill": "H.CON.RES.46",
                  "sponsor": "Ted Yoho",
                  "sponsor_party": "R",
                  "sponsor_state": "FL",
                  "last_vote_date": "",
                  "house_passage_vote": null,
                  "senate_passage_vote": null,
                  "tags": [],
                  "actions": [
                    {
                        "description": "Referred to the House Committee on Oversight and Government Reform.",
                        "datetime": "2017-04-04 00:00:00 UTC"
                    }
                  ],
                  "versions": []
              }
];