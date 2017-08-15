const sharedConfig = require('../../Shared/Config/SharedConfig');
var constants = {};

// todo: register propublica API key to Rousr, LLC
// currently registered to r. crowley
constants.PROPUBLICA_API_KEY = 'BQ03NR8CIK2paMdsiI2m05hBMiuGyyEY3jXJCLbp';
// currently registered to r. hansen-rojas
constants.PROPUBLICA_API_KEY_SECOND = 'd9MT6rGU1C9D5U1o32mMvkkeQPjUIZ4K4ZVplu60';

constants.CONGRESS_API_HOST_URI = 'api.propublica.org';
constants.BASE_CONGRESS_API_PATH = '/congress/v1';
constants.BASE_CONGRESS_API_URI = 'api.propublica.org/congress/v1';
constants.CURRENT_CONGRESS = sharedConfig.get('/currentCongress');
constants.BILL_TYPES = ['introduced' , 'updated' , 'passed' , 'major'];
constants.HOUSE_BILLS_URI = constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/' + 'house/bills/';
constants.SENATE_BILLS_URI = constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/' + 'senate/bills/';
constants.HOUSE_MEMBERS_URI = constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/' + 'house/members';
constants.SENATE_MEMBERS_URI = constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/' + 'senate/members';
constants.BILLS_BY_MEMBER_URI = constants.BASE_CONGRESS_API_PATH + '/members/';
constants.SPECIFIC_BILL = constants.BASE_CONGRESS_API_PATH + '/' + constants.CURRENT_CONGRESS + '/bills/';

//Setting this to false will make the retrieval of data much faster
constants.GET_SPECIFIC_BILL_DATA = true;

module.exports = constants;
