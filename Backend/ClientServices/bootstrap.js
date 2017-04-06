// bootstrap.js
// launches back-end client service processes

var procSpawn = require('child_process').spawn;

var authProcess = procSpawn('node', ['authStart.js']);

// change working directory to the frame directory in node_modules since
// frame is built to execute in such a way as to assume its home directory
// is the working directory. without this ClientServices becomes the working
// directory for frame which fucks up all the require reference paths.
process.chdir('node_modules/frame');
console.log('bootstrap new cwd for frame launch: ' + process.cwd());
var frameProcess = procSpawn('node', ['server.js']);

// bootstrap process will listen to auth process's stdout
authProcess.stdout.on('data', (data) => {
  console.log('authProc: ' + data);
});

// bootstrap process will listen to auth process's stderr
authProcess.stderr.on('data', (data) => {
  console.log('authProcess err: ' + data);
});

// bootstrap process will listen to usr mngmnt process's stdout
frameProcess.stdout.on('data', (data) => {
  console.log('usrManageProc: ' + data);
});

// bootstrap process will listen to usr mngmnt process's stderr
frameProcess.stderr.on('data', (data) => {
  console.log('usrManageProc err: ' + data);
});
