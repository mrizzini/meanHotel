angular.module('meanhotel').factory('AuthFactory', AuthFactory);

// will tell us if user is authenticated/logged in
// add this factory to AuthInterceptor function in auth-interceptor.js

function AuthFactory() {
    return {
        auth: auth
    };
    
    var auth = {
        isLoggedIn: false // by default is false. if someone logs in we set to true
    };
}