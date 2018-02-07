var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js'); // requires controllers file so it has access to functions in that file. 
var ctrlReviews = require('../controllers/reviews.controllers.js'); // requires controllers file so it has access to functions in that file

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll); // this maps the controller to the route
    // branching controller for query string values

router
    .route('/hotels/:hotelId') // hotelId is a parameter which will match any thing from /api/hotels/....  the controller can also access this
    .get(ctrlHotels.hotelsGetOne);

router
    .route('/hotels/new') 
    .post(ctrlHotels.hotelsAddOne);
    
//review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll); // this maps the controller to the route

router
    .route('/hotels/:hotelId/reviews/:reviewId') // hotelId is a parameter which will match any thing from /api/hotels/....  the controller can also access this
    .get(ctrlReviews.reviewsGetOne);
    

module.exports = router; //exports router to other files

// http methods:
// GET - getting certain information
// POST - create something new
// PUT - update something that already exists
// DELETE - deleting something