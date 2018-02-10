 angular.module('myApp').controller('MainController', MainController);    // module getter syntax


 function MainController($http) { // now we can use $http in function. comes with methods
     var vm = this;
     
     $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(response){
        // the above reads: go out and reach the http end point, and then once you have a response handle the response  
        console.log(response);
        vm.films = response.data; // sets returned data (6 movies) to vm.films
         
     });
     
     
     vm.name = 'Matt';
 }