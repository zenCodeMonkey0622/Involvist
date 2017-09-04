#!/bin/bash

# renames the Rousr User schema field userID to rsrUid.

rsrEnv=$1

if ! [ -d $1 ]; then
    mkdir $1
fi

if ! [ -d $1/$today ]; then
    mkdir $1/$today
fi

if [ $1 = "test" ]; then
    host="ds151433.mlab.com:51433"
    authDb="rsrtest"
    user="root"
    pw="traficand0rimas"
elif [ $1 = "dev" ]; then
    host="ds147069.mlab.com:47069"
    authDb="projectwoke"
    user="root"
    pw="g0ld0ntheceiling"
else
    echo "invalid parameters. must be either test or dev"
    exit -1
fi

mongo $host/$authDb -u $user -p $pw renameToRsrUid.js