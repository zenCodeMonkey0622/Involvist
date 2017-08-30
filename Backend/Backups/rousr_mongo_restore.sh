#!/bin/bash

# first drop all relevant collections
mongo ds151433.mlab.com:51433/rsrtest -u root -p traficand0rimas rsrDropAllCollections.js

# now restore from backup
mongorestore -h ds151433.mlab.com:51433 -u root -p traficand0rimas --authenticationDatabase rsrtest -d rsrtest 'rsrtest_mongo_backup/rsrtest'