var MongoClient = require('mongodb').MongoClient; // requires driver
// var dburl = 'mongodb://careerdevs-mwr2017-mrizzini.c9users.io:27017/meanhotel'; //defines connection string
var dburl =  'mongodb://' + process.env.IP + ':27017'; 

var _connection = null; // private var that will hold the connection

var open = function() { // will eventually use to open the connection
  MongoClient.connect(dburl, function(err, client) {
    if (err) {
      console.log("DB connection failed " + err); 
      return;
    }
    _connection = client.db("meanhotel"); // changed from _connection = db to this
    console.log("DB connection open", client);
  });
};

var get = function() { // will get the connection when its created
  return _connection;
};

module.exports = {
  open : open,
  get : get
};