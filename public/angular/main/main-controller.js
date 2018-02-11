 angular.module('myApp').controller('MainController', MainController);    // module getter syntax


//  function MainController($http) { // now we can use $http in function. comes with methods
//      var vm = this;
     
//      $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(response){
//         // the above reads: go out and reach the http end point, and then once you have a response handle the response  
//         console.log(response);
//         vm.films = response.data; // sets returned data (6 movies) to vm.films
         
//      });
     
//      vm.name = 'Matt';
//  }

 function MainController(FilmFactory) { // now that we have our factory, we can do the above this way
    var vm = this;
     
    FilmFactory.getAllFilms().then(function(response) {
       vm.films = response; // don't need response.data b/c we use that in the factory already
    });
     
    vm.name = 'Matt';
    
    vm.date1 = '12 February 2016';
    vm.date2 = '11 March 2016';
    vm.date3 = '3 January 2015';
    vm.date4 = '25 April 2014';

 }