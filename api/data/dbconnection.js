var MongoClient = require('mongodb').MongoClient; // requires driver
// var dburl = 'mongodb://careerdevs-mwr2017-mrizzini.c9users.io:27017/meanhotel'; //defines connection string
var dburl =  'mongodb://' + process.env.IP + ':' + '27017/meanhotel'; 

var _connection = null; // private var that will hold the connection

var open = function() { // will eventually use to open the connection
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed " + err);
      return;
    }
    _connection = db;
    console.log("DB connection open", db);
  });
};

var get = function() { // will get the connection when its created
  return _connection;
};

module.exports = {
  open : open,
  get : get
};