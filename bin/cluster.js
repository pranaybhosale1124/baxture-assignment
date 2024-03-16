#!/usr/bin/env node

/**
 * Module dependencies.
 */


var app = require('../app');
const cluster = require('cluster');
var http = require('http');
const numCPUs = require('os').cpus().length;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

/**
 * Create HTTP server.
 */
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {

    var port = normalizePort(process.env.PORT);
    app.set('port', port);
    var server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    
    console.log(`Worker ${process.pid} started`);

    
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log(`listening on port ${port}`);
}


  
