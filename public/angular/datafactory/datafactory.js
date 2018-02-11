// when you declare a service, a service uses a new function keyword
// when you declare a facotry as an inject into an argument, it will provide you a value that is returned
// invoking the function refernce passed to the module.factory function
// factory provides a value instead of an instant of a function. can use more easily in application

angular.module('myApp').factory('FilmFactory', FilmFactory); // attaches factory function to module called myApp

function FilmFactory($http) {
    return {
        getAllFilms: getAllFilms,
        getOneFilm: getOneFilm
    };
    
    function getAllFilms() {
        return $http.get('http://swapi-tpiros.rhcloud.com/films/').then(complete).catch(failed);
    }
    
    function getOneFilm(id) {
        return $http.get('http://swapi-tpiros.rhcloud.com/films/' + id).then(complete).catch(failed);
    }
    
    function complete(response) {
        return response.data;
    }
    
    function failed (error) {
        return error.statusText;
    }
    
}