// contains all controllers for hotel information

var hotelData = require('../data/hotel-data.json'); // this brings in the json data from the file into the hotelData var

module.exports.hotelsGetAll = function (req, res) {
      console.log('GET the hotels');
        res
            .status(200)
            .json( hotelData ); // returns all the hotel data in that file
};

module.exports.hotelsGetOne = function (req, res) { // conected to the api/hotels/... route
      var hotelId = req.params.hotelId // finds url parameter when this route is called and assigns to var
      var thisHotel = hotelData[hotelId]; // holds info about an indiviudal hotel
      console.log('GET hotelId', hotelId);
        res
            .status(200)
            .json( thisHotel ); // 
};