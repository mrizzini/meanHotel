// angular.module('meanhotel').directive('mhNavigation', mhNavigation);

// function mhNavigation() {
//     return {
//         restrict: 'E', // only can be used as an element
//         templateUrl: 'angular/navigation-directive/navigation-directive.html' // loads in template
//     };
// }

angular.module('meanhotel').directive('mhNavigation', mhNavigation); // this turns element to mh-Navigation

function mhNavigation() {
  return {
    restrict: 'E', // only can be used as an element
    templateUrl: 'angular/navigation-directive/navigation-directive.html' // loads in template
  };
}