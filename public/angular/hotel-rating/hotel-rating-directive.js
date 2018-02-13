// angular.module('meanhotel').directive('hotelRating', hotelRating);
// // this camel case means use hotel-rating in the html

// function hotelRating() {
//     return {
//       restrict: 'E', // restricts directive to be used as an element  
//       template: '<span ng-repeat="stars in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>', // repeats the stars
//       bindToController: true,
//       controller: 'HotelController',
//       controllerAs: 'vm',
//       scope: { // creates isolated scope
//           stars: '@' // can access attributes by value, and use =   use @ if it is an object or array
//       }
//     };
// }

// OR you can use a component instead of the above

angular.module('meanhotel').component('hotelRating', {
    // no longer need to return anything
    // no longer need restrict. by default the restriction is on the element
    // no longer need bindToController
    bindings: {
        stars: '='
    },
    template: '<span ng-repeat="stars in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>', // repeats the stars
    controller: 'HotelController',
    controllerAs: 'vm'
});