// creates controller for users. after this, we need to add route to routes/index.js

// when someone successfulyl logins in, we are to generate a token that will be used by the system

var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs'); // now we can encrypt password. can hash password
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res) { // register function
    console.log('registering user');
    
    var username = req.body.username; // contains all properties that we can collect from front end
    var name = req.body.name || null; // if req.body name is there we assign it, if not it is null
    var password = req.body.password;
    
    User.create({ // creates user in database
        username: username,
        name: name,
        // password: password   // use this to test, then encrypt
        // pasword: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) // this encrypts password
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) // this encrypts password
// Store hash in your password DB.
    }, function (err, user) { // handles error
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else { // if 201 created, we log it and return 201 status with user info
            console.log('user created', user);
            res.status(201).json(user);
        }
    });
};

module.exports.login = function(req, res) { // login function we will use as an API route
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({ // use this method to find username. in the model we set username to be unique
       username: username 
    }).exec(function(err, user) {
        // if (err) {
       if (!user || !password) {
            console.log(err);
            res.status(400).json(err);
        }  else {
            if (bcrypt.compareSync(password, user.password)) { // compares password we went in with user.password property
                console.log('User found', user);  // if they are the same
                var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 } );  
                //token generated if successful login. takes payload, a secret (environment variable defined somewhere on platform), and how long token is valid
                // res.status(200).json(user); // if we have the user, it returns the user information
                res.status(200).json({success: true, token: token}); // sends object instead of var 
                
            } else {
                res.status(401).json('Unauthorized'); // if it doesn't match, 401 status and send string
            }
        }
    });
};

module.exports.authenticate = function(req, res, next) { // create authentication function. next is a middleware. function that has access to req & res and can make changes and end cycle
    var headerExists = req.headers.authorization; // checks if req object has an authorization header
    if (headerExists) { // if it exists,
        var token = req.headers.authorization.split(' ')[1]; // Authorization Bearer xxx
        jwt.verify(token, 's3cr3t', function(error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username; // decoded is decoded token. username property was added above to payload
                next();
            }
        });
    } else {
        res.status(403).json('No token provided'); // if there is no headerExist
    }
}; // jwt.io to validate tokesn

// to get password to be encrypted, we can npm install bcrypt-nodejs
// then we must require it in here at the top