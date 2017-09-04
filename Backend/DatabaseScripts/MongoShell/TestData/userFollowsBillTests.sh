# !/bin/bash

# loads test data for userFollowsBillTests

host="ds151433.mlab.com:51433"
authDb="rsrtest"
user="root"
pw="traficand0rimas"

mongo $host/$authDb -u $user -p $pw loadUserFollowsBillsTestsData.js
