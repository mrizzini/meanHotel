// contains all controllers for hotel information

// var dbconn = require('../data/dbconnection.js'); these 3 lines no longer needed with mongoose and our database
// var ObjectId = require('mongodb').ObjectId; // requires ObjectId helper. required just this from mongodb
// var hotelData = require('../data/hotel-data.json'); // this brings in the json data from the file into the hotelData var

var mongoose = require('mongoose'); // brings in mongoose to the controller file
var Hotel = mongoose.model('Hotel'); // brings in reference to our model. use this inside controllers to interact w/ database

var runGeoQuery = function(req, res) { // builds a geospatial query

    var lng = parseFloat(req.query.lng); // gets value and keeps decimals
    var lat = parseFloat(req.query.lat);
    
    // geo-json point
    var point = { // this is the query for the database
      type: "Point",
      coordinates: [lng, lat]
    };
    
    var geoOptions = { // need this so the query can run efficiently
      spherical : true,
      maxDistance: 2000, // limits distance for search, in meters
      num : 5 // specififes number of records returns
    };
    
    Hotel.aggregate([
       { 
            "$geoNear": {
                "near": {
                     "type": "Point",
                     "coordinates": [parseFloat(req.params.lng), parseFloat(req.params.lat)]
                 },
                 "distanceField": "distance",
                 "maxDistance": 200,
                 "spherical": true,
                 "query": { "loc.type": "Point" }
             }
        },
        { 
             "$sort": {"distance": -1} // Sort the nearest first
        } 
    ]);
      
      
    
    // Hotel
    // .geoNear(point, geoOptions, function(err, results, stats) {
    //   console.log('Geo results', results);
    //   console.log('Geo stats', stats);
    //   res
    //   .status(200)
    //   .json(results);
    // });
    
};

module.exports.hotelsGetAll = function (req, res) {
  
  //these 2 lines are no longer needed with mongoose 
  // var db = dbconn.get(); // saves returned connection object from dbconnection.js as var. connects to the database
  // var collection = db.collection('hotels'); // use the database collection & work with collection hotels

  var offset = 0;
  var count = 5;
  
  if (req.query && req.query.lat && req.query.lng) { // checks if lat and lng exist, if they do, run this
    runGeoQuery(req, res); // runs runGeoQuery function, defined above
    return;
  }
  
  
      
  if (req.query && req.query.offset) { // checks if query property exists and if offset exists
    offset = parseInt(req.query.offset, 10); // we set offset parameter to a new var. need to turn to a number using parseInt
    }
      
  if (req.query && req.query.count) { // checks if query property exists and if count exists
    count = parseInt(req.query.count, 10); // we set count parameter to a new var. need to turn to a number using parseInt
    }
    
    Hotel
    .find()
    .skip(offset) // method to get how many documents to skip
    .limit(count) // method to get how many doucuments we want to return
    .exec(function(err, hotels){ // exec is a method to execute query. takes a call back. err and returned data
      console.log('Found hotels', hotels.length);
      res
      .json(hotels); // send hotels info to browser
    });
 
  // dont need this with mongoose. this was for the native driver
  // collection 
  //   .find() // chaining find method onto collection of hotels
  //   .skip(offset) // method to get how many documents to skip
  //   .limit(count) // method to get how many doucuments we want to return
  //   .toArray(function(err, docs) { // turns into an array, and makes it non-blocking
  //     console.log('Found hotels', docs); // logs the docs 
  //     res // and prints to browser
  //       .status(200)
  //       .json(docs);
  // }); 
  
  // console.log("db", db);
  
  // console.log('GET the hotels');
  // console.log(req.query);

  // var returnData = hotelData.slice(offset, offset+count); // this takes the hotelData array and slicing it and puts it into a new var

  // res
  //   .status(200)
  //   .json( returnData ); // returns all the hotel data in that file
};

module.exports.hotelsGetOne = function (req, res) { // conected to the api/hotels/... route
  //these lines were for the native driver // var db = dbconn.get(); // saves returned connection object from dbconnection.js as var. connects to the database
  // var collection = db.collection('hotels'); // use the database collection & work with collection hotels
  
  var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
  // var thisHotel = hotelData[hotelId]; // holds info about an indiviudal hotel
  console.log('GET hotelId', hotelId);
  
  // collection
  Hotel
  .findById(hotelId) // helper method to find by ID
  // .findOne({
  //   _id: ObjectId(hotelId)
  // }, function(err, doc){
  .exec(function(err, doc){
        res
    .status(200)
    .json( doc ); 
  })
};


module.exports.hotelsAddOne = function(req, res) {
  var db = dbconn.get(); // saves returned connection object from dbconnection.js as var. connects to the database
  var collection = db.collection('hotels'); // use the database collection & work with collection hotels
  var newHotel; // storing new var
  
  console.log("POST new hotel");
  
  if (req.body && req.body.name && req.body.stars) { // checks if all 3 of these exist
    newHotel = req.body; // storing req.body data into newHotel
    newHotel.stars = parseInt(req.body.stars, 10); // turning this data into a number, instead of a string
    collection.insertOne(newHotel, function(err, response) { // method to insert the newHotel data. has a callback function
      console.log(response); // logs entire response
      console.log(response.ops); // logs document we created, the json. its a property on the response object called ops
      res
        .status(201) // status for when a new resource is created
        .json(response.ops);
    });

  } else { // if data is missing, this code runs
    console.log('Data missing from body');
    res
    .status(400) // tells browser it was a bad request
    .json({message: "Required data missing from body"});
  }
  

};