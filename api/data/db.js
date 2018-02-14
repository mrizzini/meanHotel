// this file is similar to dbconnection.js, but instead we are using mongoose.
// in a real app, only one is required and it is recommended you use mongoose

var mongoose = require('mongoose'); // requires mongoose into the file
var dburl =  'mongodb://' + process.env.IP + ':27017/meanhotel'; //defines connection string as database url

mongoose.connect(dburl);
// need to listen to events
mongoose.connection.on('connected', function(){ // listens for the connected event.
    console.log('Mongoose connected to ' + dburl); // waiting for mongoose connection and logs to console when it happens
});
mongoose.connection.on('disconnected', function(){ // listens for the disconnected event.
    console.log('Mongoose disconnected'); // waiting for mongoose to disconnection and logs to console when it happens
});
mongoose.connection.on('error', function(err){ // listens for the error event.
    console.log('Mongoose connection error ' + err); // waiting for mongoose error and logs to console when it happens
});

// mongoose will keep trying to reconnect if it gets disconnected, if mongod is running

// these listen for events in the main node process. 
process.on('SIGINT', function(){ // this listens for the SIGINT, happens when you press CTRL+C. takes callback
    mongoose.connection.close(function(){ // this line closes mongoose connection. takes callback
        console.log('Mongoose disconnected through app termination (SIGINT)'); // logs when it is called 
        process.exit(0); // tells process it can finish, it can exit
    });
});

process.on('SIGTERM', function(){ // this listens for the SIGTERM, for Heroku app termination. takes callback
    mongoose.connection.close(function(){ // this line closes mongoose connection. takes callback
        console.log('Mongoose disconnected through app termination (SIGTERM)'); // logs when it is called 
        process.exit(0); // tells process it can finish, it can exit
    });
});

process.once('SIGUSR2', function(){ // this listens for the SIGUSR event, happens for nodemon. takes callback
    mongoose.connection.close(function(){ // this line closes mongoose connection. takes callback
        console.log('Mongoose disconnected through app termination (SIGUSR2)'); // logs when it is called 
        process.kill(process.pid, 'SIGUSR2'); // sends event so nodemon picks it up
    });
});

// BRING IN SCHEMAS AND MODELS

require('./hotels.model.js');
require('./users.model.js');
// after this, we need to write our controller code. create controller files