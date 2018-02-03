require('./instantHello');    // loads in other scripts to use. looks in same directory you are in. don't use .js

var goodbye = require('./talk/goodbye'); // assigns goodbye file to a variable so we can access it
var talk = require('./talk') // will look for a file called talk.js, then will look for a file caled index.js
var question = require('./talk/question');

talk.intro();
talk.hello("Matt"); // pushes a variable into the method

var answer = question.ask('What is the meaning of life?');
console.log(answer);

goodbye(); // calls the function 


// express is the web application framework. listens for incoming requests and responds. it can serve static files, compile and deliver HTML, return json data
var express = require('express'); // requires express
var app = express(); // initializes it, so we can use it in our app
var path = require('path');
var bodyParser = require('body-parser'); // middleware. parses incoming request bodies in a middleware before your handlers, available under the req.body property.

var routes = require('./api/routes');

app.set('port', process.env.PORT);

app.use(function(req, res, next) { // this is middleware. these run sequentially
    console.log(req.method, req.url); // will log what method is (post, get), and what the requested url is
    next();
});

app.use(express.static(path.join(__dirname, 'public'))); // when express receives request for root, it checks if root is matched in any files in public folder.
//if so it will deliver that ifle direclty to browswer without need to add any extra routes
// app.use = middleware. any request that comes in will run through the functionality and run until it hits a route or something returns a response

// app.get('/', function(req, res) {
//     console.log('GET the homepage');
//     res
//         .status(200)
//         .sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(bodyParser.urlencoded({ extended : false })); // extended to false means we only need string and arrays from our form body

app.use('/api', routes); // the / means express will look inside routes file for any route starting with /api

// app.get('/file', function(req, res) { // this serves an entire file. like an html page
//     console.log('GET the file');
//     res
//         .status(200)
//         .sendFile(path.join(__dirname, 'app.js'));
// });

var server = app.listen(app.get('port'), function() { // app.listen returns an object. we can access this by assignging a variable
    var port = server.address().port; // this gets the port number and assigns to port
    console.log('Magic Happens on port ' + port); // this confirms that the listen is running
});

// the idea of routing is about listening to reeusts on speicifc urls, doing somehthing on the server, then sending a response
//
