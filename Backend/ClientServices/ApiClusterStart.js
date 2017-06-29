// index.js
// main entry-point for involvist client services

// DEPRECATED. KEEPING AROUND FOR CLUSTER REFERENCE CODE 
var cluster = require('cluster');
var express = require('express');
var gateway = require('./endpoints/gateway');
const auth = require('./auth/authentication');
//var numCPUs = require('os').cpus().length;
//DEBUG CODE: setting numCPUs to 1 to make debugging easier.
var numCPUs = 1;

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    // Workers share the TCP connection in this server
    var app = express();

    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
        if(req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET");
            return res.status(200).json({});
        }
        next();
    });

    const bodyParser = require('body-parser');
    
    app.use(bodyParser.json());
    app.use('/oauth', auth.AuthenticationRouter);
    
    app.use('/api', gateway);

    // debug
    app.listen('3000', function () {
        console.log('Listening on 3000');
    });
}
