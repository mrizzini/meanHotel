// most of this is a schema, and then a data model is exported out of here
// schema is a javascript object

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({ // reviews are sub-documents. create its own Schema
   name : {
    type : String,
    required : true
  },
   rating : {
    type : Number,
    required : true,
    min : 0,
    max : 5
  },
    review : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var roomSchema = new mongoose.Schema({ // nested Schemas must be defined before main parent Schema. 
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

var hotelSchema = new mongoose.Schema({ // method to start a new Schema and store in var
    // path: Schema type (Strings, buffer, mixed, arrays, etc)
    // or you can set as an object, which allows you to validate data. 
    
    // name: String, // defines a field (path) in the database called name and sets that data to a string (schema type)
    name : { // same thing as defining name as a string, but can add other properties 
        type : String,
        required : true // name must be used
    },
    stars : {
        type : Number, // stars should be a number
       min : 0, // must be a min of 0
        max : 5, // and max of 5
        "default" : 0 // default is 0, if you don't set a number it will set as 0. use quotes b/c default is defined
    },
    services : [String], // array of strings
    description : String, // shorthand to define it as a string
    photos : [String],
    currency : String,
    reviews : [reviewSchema], // pass in review Schema. when a new review is added, a _id will be added. this is owned by the parent hotelSchema
    rooms : [roomSchema], // pass in room Schema. 
    location : {
    address : String,
        // always store coordinates longtitude(E/W), latitude(N/S) order
         coordinates : {
      type : [Number],
      index : '2dsphere'  // tells mongo to index the coordinates path and map them as a sphere
    }
  }
});
            

// a model is a compiled version of the Schema. a single instance of the model has
// a direct 1-1 relationship with a single document in the database
// all data interactions with mongoose must go thru the model

mongoose.model('Hotel', hotelSchema); // compiles model. (name of model we are using, name of Schema, name of mongoDB collection) 
// this must come after Schemas. mongoDB collection is optional. if none, it will use lowercase pluralized version of model name