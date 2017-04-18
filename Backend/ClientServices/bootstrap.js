// bootstrap.js
// launches back-end client service processes

// set the appropriate environment variables
process.env.NODE_ENV = 'test';
console.log('bootstrap NODE_ENV = ' + process.env.NODE_ENV);

var procSpawn = require('child_process').spawn;

var authProcess = procSpawn('node', ['AuthStart.js']);

// change working directory to the frame directory in node_modules since
// frame is built to execute in such a way as to assume its home directory
// is the working directory. without this ClientServices becomes the working
// directory for frame which fucks up all the require reference paths.
process.chdir('node_modules/frame');
var frameProcess = procSpawn('node', ['server.js']);

// bootstrap process will listen to auth process's stdout
authProcess.stdout.on('data', (data) => {
  console.log('authProc: ' + data);
});

// bootstrap process will listen to auth process's stderr
authProcess.stderr.on('data', (data) => {
  console.log('authProcess err: ' + data);
});

// bootstrap process will listen to usr mngmnt process's stdoutq
frameProcess.stdout.on('data', (data) => {
  console.log('usrManageProc: ' + data);
});

// bootstrap process will listen to usr mngmnt process's stderr
frameProcess.stderr.on('data', (data) => {
  console.log('usrManageProc err: ' + data);
});