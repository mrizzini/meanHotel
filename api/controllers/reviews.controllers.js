var mongoose = require('mongoose'); // brings in mongoose to the controller file
var Hotel = mongoose.model('Hotel'); // brings in reference to our model. use this inside controllers to interact w/ database


//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {

    var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
    console.log('GET hotelId', hotelId);
  
    Hotel
        .findById(hotelId) // helper method to find by ID
        .select('reviews') // allows which path you want
        .exec(function(err, doc){ 
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Hotel id not found in database, ',  hotelId);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + hotelId
                };
            } else {
                response.message = doc.reviews ? doc.reviews : []; // this sends a message of the reviews or an empty array
            }
            res
                .status(response.status)
                .json(response.message); // returns all reviews for the hotel
            });
    };  


//GET single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
    var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
    var reviewId = req.params.reviewId; // finds url parameter when this route is called and assigns to var
    console.log('GET reviewId ' + reviewId + " for hotelId " + hotelId);
    
       Hotel
        .findById(hotelId) // helper method to find by ID
        .select('reviews') // allows which path you want
        .exec(function(err, hotel){
            var review = hotel.reviews.id(reviewId); // gets specific review from the model
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : 'Hotel ID not found ' + hotelId
                };
            } else {
                // Get the review
                response.message = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
        }
            res
                .status(response.status)
                .json(response.message); // returns just the specific review
            });
};

var _addReview = function(req, res, hotel) { // function to manage saving of the review
    //sub docs in mongo are objects held in an array. review array is a property of the hotel document
    // doc/hotel = model instance
    // need to push new data into this array
    
    hotel.reviews.push({
       name : req.body.name, // sends in name of person who wrote it, from mongoose schema
       rating : parseInt(req.body.rating, 10),
       review : req.body.review
    });
    
    // save method runs on the model instance. saves model instance. saves parent document.
    hotel.save(function(err, hotelUpdated){
        if (err) {
            res
            .status(500)
            .json(err);
        } else {
            res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
            // this gets us the last review in the array, the one we just created
        }
    });
};


module.exports.reviewsAddOne = function(req, res) { // adds new review to a hotel

    var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
    console.log('GET hotelId', hotelId);
  
    Hotel
        .findById(hotelId) // helper method to find by ID
        .select('reviews') // allows which path you want
        .exec(function(err, doc){ 
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log('Hotel id not found in database, ',  hotelId);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + hotelId
                };
            }  
            if (doc) { // after our error trapping, if there is a document, we call the _addReview func
                _addReview(req, res, doc)
            } else { // if there isnt a doc, we send the following
            res
                .status(response.status)
                .json(response.message); // returns all reviews for the hotel
                }
            });
    
};

module.exports.reviewsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
    var reviewId = req.params.reviewId; // finds url parameter when this route is called and assigns to var
    console.log('PUT reviewId ' + reviewId + " for hotelId " + hotelId);
    
       Hotel
        .findById(hotelId) // helper method to find by ID
        .select('reviews') // allows which path you want
        .exec(function(err, hotel){
            var review = hotel.reviews.id(reviewId); // gets specific review from the model
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : 'Hotel ID not found ' + hotelId
                };
            } else {
                // Get the review
                response.message = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
        }
        if (response.status !== 200) {
            res
                .status(response.status)
                .json(response.message); // returns just the specific review
        } else {
            review.name = req.body.name; // sends in name of person who wrote it, from mongoose schema
            review.rating = parseInt(req.body.rating, 10);
            review.review = req.body.review;
            hotel.save(function(err, hotelUpdated) {
                if (err) {
                    res
                    .status(500)
                    .json(err);
                } else {
                    res
                    .status(204)
                    .json();
                }
            });
        }
    });
};

module.exports.reviewsDeleteOne = function(req, res) { // deletes sub-doc, a review
    var hotelId = req.params.hotelId; // finds url parameter when this route is called and assigns to var
    var reviewId = req.params.reviewId; // finds url parameter when this route is called and assigns to var
    console.log('DELETE reviewId ' + reviewId + " for hotelId " + hotelId);
    
       Hotel
        .findById(hotelId) // helper method to find by ID
        .select('reviews') // allows which path you want
        .exec(function(err, hotel){
            var review = hotel.reviews.id(reviewId); // gets specific review from the model
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database ", hotelId);
                response.status = 404;
                response.message = {
                    "message" : 'Hotel ID not found ' + hotelId
                };
            } else {
                // Get the review
                response.message = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
        }
        if (response.status !== 200) {
            res
                .status(response.status)
                .json(response.message); // returns just the specific review
        } else {
           hotel.reviews.id(reviewId).remove(); // takes model instance, gets the reviews, gets a certain review by ID, and deletes
            hotel.save(function(err, hotelUpdated) {
                if (err) {
                    res
                    .status(500)
                    .json(err);
                } else {
                    res
                    .status(204)
                    .json();
                }
            });
        }
    });
};