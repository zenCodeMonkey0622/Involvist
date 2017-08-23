'use strict';

// set the appropriate environment variables
process.env.NODE_ENV = 'dev';

var BillRetriever = require("./BillRetrievalService").BillRetriever;
BillRetriever.startGetCongressMembersBillsSchedule();
