angular.module('myApp').filter('dateSuffix', dateSuffix); // .filter takes the name of the filter and the function

function dateSuffix($filter) { // this gets us access to built in filters in angular
    
    var suffixes = ['th', 'st', 'nd', 'rd'];
    
    return function(string) { // need to return this
        if (string) {
            var dtfilter = $filter('date')(string, 'dd MMM yyy @ H:m:s');
            // applies the date filter. no matter what the string looks like, it will be converted to this format
            var day = parseInt(dtfilter.substr(0, 2));
            // extracts the day from the dtfilter
            var relevantDigits = (day < 30) ? day % 20 : day % 30;
            // calculate the relevant digits to determine what the suffix will be
            var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
            // sets the suffix depending on what the relevantdigit is
            dtfilter = dtfilter.substring(2);
            return day + suffix + dtfilter;
        }
    };


}