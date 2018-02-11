 angular.module('myApp').controller('FilmController', FilmController);  
 
//  function FilmController($http, $routeParams) { //$routeParams can collect parameters from your routes
//      var vm = this;
//      var id = $routeParams.id; // sets id to whatever the url is
//     //  vm.about = 'This is my bio';
//     $http.get('http://swapi-tpiros.rhcloud.com/films/' + id).then(function(response) {
//         vm.film = response.data;
//     });
//  }

 function FilmController($routeParams) { // we can use this now with our factory. don't need any $http
     var vm = this;
     var id = $routeParams.id; // sets id to whatever the url is
    
    FilmFactory.getOneFilm(id).then(function(response) {
        vm.film = response;
    });
 }