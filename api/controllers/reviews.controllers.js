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
        console.log('Returned doc', doc)
            res
                .status(200)
                .json( doc.reviews ); // returns all reviews for the hotel
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
            console.log('Returned hotel', hotel);
            var review = hotel.reviews.id(reviewId); // gets specific review from the model
            res
                .status(200)
                .json( review ); // returns just the specific review
            });
};

