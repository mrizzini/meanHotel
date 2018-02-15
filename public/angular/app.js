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

angular.module('meanhotel', ['ngRoute', 'angular-jwt']).config(config).run(run); // need run when you have the interceptor. gets executed after injector is created
// .controller('HotelsController', HotelsController);

function config($httpProvider, $routeProvider) { // need Provider b/c we created interceptor
    $httpProvider.interceptors.push('AuthInterceptor');   // need to add custom interceptor
    
    $routeProvider
    // .when('/', {
    //     templateUrl: 'angular/hotel-list/hotels.html',
    //     controller: HotelsController,
    //     controllerAs: 'vm'
    // })
    .when('/', {
        templateUrl: 'angular/main/main.html',
        access: { // when someone is at this page, it is not a restricted path
            restricted: false
        }
    })
    .when('/hotels', {
        templateUrl: 'angular/hotel-list/hotels.html',
        controller: HotelsController,
        controllerAs: 'vm'
    })
    .when('/hotel/:id', {
        templateUrl: 'angular/hotel-display/hotel.html',
        controller: HotelController,
        controllerAs: 'vm',
        access: { // when someone is at this page, it is not a restricted path
            restricted: false
        }
    })
    .when('/register', { // sets up routes for register page
        templateUrl: 'angular/register/register.html',
        controller: RegisterController,
        controllerAs: 'vm',
        access: { // when someone is at this page, it is not a restricted path
            restricted: false
        }
    })
    .when('/profile', {
        templateUrl: 'angular/profile/profile.html',
        controllerAs: 'vm',
        access: { // when someone is at this page, it is a restricted path
            restricted: true
        }
    })
    .otherwise({ // if none of these match, we redirect to route of the app
        redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
        // if user is not logged in and there is no token in the session 
            event.preventDefault(); // we dont navigate to the path
            $location.path('/'); // and send to route
        }
    });
}