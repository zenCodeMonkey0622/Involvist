'use strict';

// set the appropriate environment variables
process.env.NODE_ENV = 'test';

var BillRetriever = require("./BillRetrievalService").BillRetriever;
BillRetriever.startGetCongressMembersBillsSchedule();
