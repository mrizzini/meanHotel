var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js'); // requires controllers file so it has access to functions in that file. 

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll); // this maps the controller to the route

router
    .route('/hotels/:hotelId') // hotelId is a parameter which will match any thing from /api/hotels/....  the controller can also access this
    .get(ctrlHotels.hotelsGetOne);





module.exports = router; //exports router to other files