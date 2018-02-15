angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) { // use all these from auth-interceptor + jwtHelper package from angular-jwt
                                                                              //angular-jwt can extract info from token. need to add to index.html. dependency
    var vm = this;
    
    vm.isLoggedIn = function() { // helper method 
        if (AuthFactory.isLoggedIn) { // if AuthFactory is logged in
            return true;
        } else {
            return false;
        }
    };
    
    // create login and logout functions
    
    vm.login = function() {
        if (vm.username && vm.password) { // if both exist
            var user = { // create user object to send to backend
                username: vm.username,
                password: vm.password
            };
            // logins user
            $http.post('/api/users/login', user).then(function(response) { // post to this endpoint and send user obj
                if (response.data.success) { // if successful login
                    // console.log(response); // log response
                    $window.sessionStorage.token = response.data.token; // storing token in session storage of browser
                    AuthFactory.isLoggedIn = true; // sets this to true so that user is logged in
                    var token = $window.sessionStorage.token; // capturing token from session storage
                    var decodedToken = jwtHelper.decodeToken(token); //decodes token 
                    vm.loggedInUser = decodedToken.username; // add logged in user property so we can access it in html
                    // need to add jwtHelper as dependency to app.js
                }
            }).catch(function(error) { // catching errors
                console.log(error);
            });
            
        }
    };
    
    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token; // delete token from session storage
        $location.path('/'); // redirects user to route of app
    };
    
    vm.isActiveTab = function(url) { // will help us have a better navigation system in place. creates diff style for active tabs
        var currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active' : '');
    };
}