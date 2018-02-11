angular.module('myApp').filter('reverse', reverse); // .filter takes the name of the filter and the function

function reverse() {
 return function(string) {
    if (string) {
        return string.split('').reverse().join('');
    }
 };
}