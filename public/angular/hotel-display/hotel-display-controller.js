// controller that we are using for the html hotel template

angular.module('meanhotel').controller('HotelController', HotelController);


// function HotelController($http, $routeParams) { // routeParams so we can access the ID
    function HotelController($routeParams, hotelDataFactory) { // routeParams so we can access the ID
    var vm = this;
    var id = $routeParams.id; // stores id
    // $http.get('/api/hotels/' + id).then(function(response) {
    hotelDataFactory.hotelDisplay(id).then(function(response) {

    vm.hotel = response.data;
    });
}

// ('/hotels/:hotelId')