// userManagementStart.js
// main entry point for involvist user management service (Frame)

const Composer = require('./index');

Composer((err, server) => {
    if (err)
    {
        throw err;
    }
    server.start(() => {
        console.log('Started the plot device on port ' + server.info.port);
    });
});
