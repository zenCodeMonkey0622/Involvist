// index.js
// main entry-point for involvist client services

// DEPRECATED. KEEPING AROUND FOR CLUSTER REFERENCE CODE 
var cluster = require('cluster');
var express = require('express');
var numCPUs = require('os').cpus().length;
var auth = require('./auth/authentication');
var gateway = require('./endpoints/gateway');

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    // Workers share the TCP connection in this server
    var app = express();

    app.use('/oauth', auth.AuthenticationRouter);
    app.use('/api', gateway);

    // debug
    app.listen('3000', function () {
        console.log('listening on 3000');
    });
}
