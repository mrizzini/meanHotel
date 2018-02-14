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
    
  // var geoOptions = { // need this so the query can run efficiently
  //   spherical : true,
  //   maxDistance: 2000, // limits distance for search, in meters
  //   num : 5 // specififes number of records returns
  // };
    
  Hotel.aggregate([ // THIS REPLACED GEONEAR.
    { 
      "$geoNear": {
          "near": point,
          "distanceField": "distance",
          "maxDistance": 2000, // limits distance for search, in meters
          "spherical": true,
          "num": 5 // specififes number of records returns
        }
      },
    ], function(err, results, stats) {
      console.log('Geo results', results);
      console.log('Geo stats', stats);
      if (err) {
        console.log('Error finding hotels');
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(results);
      }
    });
    
    // Hotel GEONEAR DOESN'T WORK FOR NEWEST MONGO
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

  console.log('Requested by: ' + req.user); //access user property
  console.log('GET the hotels');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount= 10;
  
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
    
  if (isNaN(offset) || isNaN(count)) { // checks if these vars are not numbers. if they are not, 
    res
      .status(400) // sets status to 400
      .json({ // sends message to browser
        "message": "If supplied in querystring count and offset should be numbers"
      });
    return; // ends function
  }  
    
    if (count > maxCount) { // if count is entered and higher than maxCount
      res // send status code and message
        .status(400)
        .json({
          "message": "Count limit of " + maxCount + " exceeded"
      });
      return;
    }
    
    Hotel
    .find()
    .skip(offset) // method to get how many documents to skip
    .limit(count) // method to get how many doucuments we want to return
    .exec(function(err, hotels){ // exec is a method to execute query. takes a call back. err and returned data
      if (err) { // if error happens run this
        console.log('Error finding hotels');
        res
          .status(500) // sends 500 status code
          .json(err); // sends err to browser
      } else {
        console.log('Found hotels', hotels.length);
        res
          .json(hotels); // send hotels info to browser
      }
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
    var response = {
      status: 200,
      message: doc
    };
    if (err) { // if error happens run this
      console.log('Error finding hotel');
      response.status = 500; // sends 500 status code
      response.message = err; // sends err to browser
      } else if (!doc) { // if hotelId is empty
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found"
        };
      } 
    res
      .status(response.status)
      .json(response.message); 
  });
};

var _splitArray = function(input) { //helper function for our hotelsAddOne function
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};


module.exports.hotelsAddOne = function(req, res) {
  
  Hotel
    .create({ // contains data that will be added to the db
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars, 10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [
          parseFloat(req.body.lng), 
          parseFloat(req.body.lat)
          ]
      }
    }, function(err, hotel){ // callback that holds 2 params. err, and the new document
      if (err) {
        console.log('Error creating hotel', hotel);
        res
          .status(400)
          .json(err);
      } else {
        console.log('Hotel created', hotel);
        res
          .status(201) // created status code
          .json(hotel); // returns new hotel
      }
    });
  
  // old native driver code
  // var db = dbconn.get(); // saves returned connection object from dbconnection.js as var. connects to the database
  // var collection = db.collection('hotels'); // use the database collection & work with collection hotels
  // var newHotel; // storing new var
  
  // console.log("POST new hotel");
  
  // if (req.body && req.body.name && req.body.stars) { // checks if all 3 of these exist
  //   newHotel = req.body; // storing req.body data into newHotel
  //   newHotel.stars = parseInt(req.body.stars, 10); // turning this data into a number, instead of a string
  //   collection.insertOne(newHotel, function(err, response) { // method to insert the newHotel data. has a callback function
  //     console.log(response); // logs entire response
  //     console.log(response.ops); // logs document we created, the json. its a property on the response object called ops
  //     res
  //       .status(201) // status for when a new resource is created
  //       .json(response.ops);
  //   });

  // } else { // if data is missing, this code runs
  //   console.log('Data missing from body');
  //   res
  //   .status(400) // tells browser it was a bad request
  //   .json({message: "Required data missing from body"});
  // }
};


module.exports.hotelsUpdateOne = function(req, res) {
  // find specific doc to creare model instance
  // update data in model instance
  // save the model instance
  // send response to request
  
  var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
  console.log('PUT hotelId', hotelId);
  
  // collection
  Hotel
    .findById(hotelId) // helper method to find by ID
    .select("-reviews -rooms") // excludes these sub-docs
    .exec(function(err, doc){
      var response = {
        status: 200,
        message: doc
    };
    if (err) { // if error happens run this
      console.log('Error finding hotel');
      response.status = 500; // sends 500 status code
      response.message = err; // sends err to browser
    } else if (!doc) { // if hotelId is empty
      response.status = 404;
      response.message = {
        "message": "Hotel ID not found"
        };
      }
      if (response.status !== 200) {
    res
      .status(response.status)
      .json(response.message); 
      } else {
        doc.name = req.body.name; // updates the model instance
        doc.description = req.body.description;
        doc.stars = parseInt(req.body.stars, 10);
        doc.services = _splitArray(req.body.services);
        doc.photos = _splitArray(req.body.photos);
        doc.currency = req.body.currency;
        doc.location = {
          address : req.body.address,
          coordinates : [
            parseFloat(req.body.lng), 
            parseFloat(req.body.lat)
          ]
        };
       
       doc.save(function(err, hotelUpdated) { // saves updated hotel info
         if(err) {
           res
           .status(500)
           .json(err);
         } else {
           res
           .status(204)  // if save operation is successful, REST standards has a 204 status
           .json(); // and no content. send an empty response
         }
       }); 
      }
  });
};

module.exports.hotelsDeleteOne = function(req, res) { // deletes document from mongoose
  var hotelId = req.params.hotelId;
  
  Hotel
    .findByIdAndRemove(hotelId) // finds by id and deletes
    .exec(function(err, hotel) { // accepts err and data from hotel being deleted
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Hotel deleted, id", hotelId);
        res
          .status(204)
          .json();
      }
    });
};