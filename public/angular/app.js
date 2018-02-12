// angular.module('myApp', ['ngRoute']).config(config); // the [] is for dependecies. need it even if its empty

// // single page application, a user can naviagate the app without the page ever refreshing. urls change but the app itself does not refresh.
// // what changes is the part of the app. if someone goes to a route, an html page is loaded into the app and displayed
// // in angular, SPA can be used with routes. when URL changes, angular changes the controller and the view template


// function config($route) { // $route allows you to set up routes in app. angular service
//     $routeProvider.when('/', { // sets up route for the route of the app
//         templateUrl: '/public/angular/main/main.html',
//         controller: 'MyController',
//         controllerAs: 'vm'
//     }).when('/film:id', { // sets up route for /film page and takes id parameter. this can be passed to http get request
//         templateUrl: '/public/angular/film/film.html',
//         controller: 'FilmController',
//         controllerAs: 'vm'
//     }).otherwise({ // if anything else, redirect to route
//         redirectTo: '/'
//     });
// }

angular.module('meanhotel', ['ngRoute']).config(config)
// .controller('HotelsController', HotelsController);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'angular/hotel-list/hotels.html',
        controller: HotelsController,
        controllerAs: 'vm'
    })
    .when('/hotel/:id', {
       templateUrl: 'angular/hotel-display/hotel.html',
       controller: HotelController,
       controllerAs: 'vm'
    });
    
}

