#!/bin/bash

today=$(date +%F)

mkdir $today
mongodump -h ds151433.mlab.com:51433 -d rsrtest -u root -p traficand0rimas -o "rsrtest_mongo_backup"
cp -r "rsrtest_mongo_backup" "$today"

