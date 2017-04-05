// bootstrap.js
// launches back-end client service processes

var childSpawn = require('child_process').spawn;
var authProcess = childSpawn('node', ['authStart.js']);
var frameProcess = childSpawn('node', ['userManageStart.js']);

authProcess.stdout.on('data', (data) => {
  console.log('authProc: ' + data);
});

frameProcess.stdout.on('data', (data) => {
  console.log('usrManageProc: ' + data);
});
