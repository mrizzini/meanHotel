// controller that we are using for the html hotel template

angular.module('meanhotel').controller('HotelController', HotelController);


// function HotelController($http, $routeParams) { // routeParams so we can access the ID
    function HotelController($route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) { // routeParams so we can access the ID
    // jwthelper will help with name in addReview 
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
    
    // function to determine if someone is authorized and authenticated
    // need to add AuthFactory to controller. returns false if not logged in. true if logged in.
    // function will be the same as in our login-controller
    // need to fix on the back end as well on index.js
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };
    
    
    vm.addReview = function() { // function is called when you submit review
    
        var token = jwtHelper.decodeToken($window.sessionStorage.token); // extracts token
        var username = token.username; // extracts username
    
        var postData = { // creates a postData variable where u collect all data from the form
            // name: vm.name,
            name: username, // use this instead of vm.name to have form not need name
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