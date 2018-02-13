// controller that we are using for the html hotel template

angular.module('meanhotel').controller('HotelController', HotelController);


// function HotelController($http, $routeParams) { // routeParams so we can access the ID
    function HotelController($route, $routeParams, hotelDataFactory) { // routeParams so we can access the ID
    var vm = this;
    var id = $routeParams.id; // stores id
    // $http.get('/api/hotels/' + id).then(function(response) {
    hotelDataFactory.hotelDisplay(id).then(function(response) {

    vm.hotel = response.data;
    vm.stars = _getStarRating(response.data.stars); // calls function to turn stars number into an array
    });
    
    function _getStarRating(stars) { // helper function to turn stars number into an array
        return new Array(stars);
    }
    
    vm.addReview = function() { // function is called when you submit review
        var postData = { // creates a postData variable where u collect all data from the form
            name: vm.name,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) { // if it is valid, post review function from hotel data factory
            hotelDataFactory.postReview(id, postData).then(function(response) {
            if (response.status === 201) { // if post request gives created status code 201, then run this
                console.log("status is " + response.status);
                $route.reload();   // reload this route
            }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}

// ('/hotels/:hotelId')