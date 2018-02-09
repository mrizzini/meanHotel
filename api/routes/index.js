var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js'); // requires controllers file so it has access to functions in that file. 
var ctrlReviews = require('../controllers/reviews.controllers.js'); // requires controllers file so it has access to functions in that file

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll) // this maps the controller to the route
    .post(ctrlHotels.hotelsAddOne); // post route to add document, a new hotel

router
    .route('/hotels/:hotelId') // hotelId is a parameter which will match any thing from /api/hotels/....  the controller can also access this
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne) // updates specific hotel. put updates entire document
    .delete(ctrlHotels.hotelsDeleteOne); // deletes hotel


// router
//     .route('/hotels/new') 
//     .post(ctrlHotels.hotelsAddOne);
    
//review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll) // this maps the controller to the route
    .post(ctrlReviews.reviewsAddOne); // post route to add review, a sub-document

router
    .route('/hotels/:hotelId/reviews/:reviewId') // hotelId is a parameter which will match any thing from /api/hotels/....  the controller can also access this
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne) // route to update a specific hotel review
    .delete(ctrlReviews.reviewsDeleteOne) // deletes specific hotel review
    

module.exports = router; //exports router to other files

// http methods:
// GET - getting certain information
// POST - create something new
// PUT - update something that already exists
// DELETE - deleting something

// APIs should always return a response, return the correct HTTP status code, and return contents/msg