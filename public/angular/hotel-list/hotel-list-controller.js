angular.module('meanhotel').controller('HotelsController', HotelsController);

// function HotelsController($http) {
    function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'MEAN Hotel App';
    // $http.get('/api/hotels?count=10').then(function(response) {
    hotelDataFactory.hotelList().then(function(response) {
    //   console.log(response); 
    vm.hotels = response.data;
    });
}