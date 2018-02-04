// contains all controllers for hotel information

var dbconn = require('../data/dbconnection.js');
var hotelData = require('../data/hotel-data.json'); // this brings in the json data from the file into the hotelData var

module.exports.hotelsGetAll = function (req, res) {
  
  var db = dbconn.get(); // saves returned connection object from dbconnection.js as var. connects to the database
  var collection = db.collection('hotels'); // use the database collection & work with collection hotels
  
  collection
    .find() // chaining find method onto collection of hotels
    .toArray(function(err, docs) { // turns into an array, and makes it non-blocking
      console.log('Found hotels', docs); // logs the docs 
      res // and prints to browser
        .status(200)
        .json(docs);
   }); 
  

  
  // console.log("db", db);
  
  // console.log('GET the hotels');
  // console.log(req.query);
      
  // var offset = 0;
  // var count = 5;
      
  // if (req.query && req.query.offset) { // checks if query property exists and if offset exists
  //   offset = parseInt(req.query.offset, 10); // we set offset parameter to a new var. need to turn to a number using parseInt
  //   }
      
  // if (req.query && req.query.count) { // checks if query property exists and if count exists
  //   count = parseInt(req.query.count, 10); // we set count parameter to a new var. need to turn to a number using parseInt
  //   }
      
  // var returnData = hotelData.slice(offset, offset+count); // this takes the hotelData array and slicing it and puts it into a new var

  // res
  //   .status(200)
  //   .json( returnData ); // returns all the hotel data in that file
};

module.exports.hotelsGetOne = function (req, res) { // conected to the api/hotels/... route
  var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
  var thisHotel = hotelData[hotelId]; // holds info about an indiviudal hotel
  console.log('GET hotelId', hotelId);
  res
    .status(200)
    .json( thisHotel ); // 
};


module.exports.hotelsAddOne = function(req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};