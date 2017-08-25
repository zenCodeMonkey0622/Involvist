#!/bin/bash

today=$(date +%F)

mongodump -h ds151433.mlab.com:51433 -d rsrtest -u root -p traficand0rimas -o "./rsr_mongo_backup-$today"
