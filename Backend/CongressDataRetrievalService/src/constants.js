var constants = {};

constants.PROPUBLICA_API_KEY = 'BQ03NR8CIK2paMdsiI2m05hBMiuGyyEY3jXJCLbp';
constants.BASE_CONGRESS_API_URI ='https://api.propublica.org/congress/v1';
constants.CURRENT_CONGRESS = '115' ;
constants.BILL_TYPES = ['introduced' , 'updated' , 'passed' , 'major'];
constants.HOUSE_BILLS_URI = constants.BASE_CONGRESS_API_URI + constants.CURRENT_CONGRESS + '/' + 'house/bills/';
constants.SENATE_BILLS_URI = constants.BASE_CONGRESS_API_URI + constants.CURRENT_CONGRESS + '/' + 'senate/bills/';
constants.HOUSE_MEMBERS_URI = constants.BASE_CONGRESS_API_URI + constants.CURRENT_CONGRESS + '/' + 'house/members';
constants.SENATE_MEMBERS_URI = constants.BASE_CONGRESS_API_URI + constants.CURRENT_CONGRESS + '/' + 'senate/members';
constants.BILLS_BY_MEMBER_URI = constants.BASE_CONGRESS_API_URI + 'members/';
constants.SPECIFIC_BILL = constants.BASE_CONGRESS_API_URI + constants.CURRENT_CONGRESS + '/bills/';

//Setting this to false will make the retrieval of data much faster
constants.GET_SPECIFIC_BILL_DATA = true;

module.exports = constants;
