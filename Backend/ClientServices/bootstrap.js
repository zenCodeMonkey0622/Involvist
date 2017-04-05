// bootstrap.js
// launches back-end client service processes

var authSpawn = require('child_process').spawn;

var authProcess = authSpawn('node', ['authStart.js']);

authProcess.stdout.on('data', (data) => {
  console.log('authProcess: ' + data);
});
