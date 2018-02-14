angular.module('meanhotel').controller('RegisterController', RegisterController); // sets register controller

function RegisterController($http) { 
  var vm = this;  
  
  vm.register = function () { // register function for html
      var user = { // object for user info from the forms that we will pass to http post request to register endpoint
          username: vm.username,
          password: vm.password
      };
      
      // before we send to back end check this
      if (!vm.username || !vm.password) { // if username or password don't exist
          vm.error = 'Please add a username and a password';
      } else { // check if password does not equal the repeated password. if not, error
        if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure passwords match.';
      } else { // if both of those didn't happen, do this
        $http.post('/api/users/register', user).then(function(result) { // posts to the endpoint
            console.log(result);
            vm.message = 'Successful registration, please login.'; // and sets message
            vm.error = ''; //clears any errors
        }).catch(function(error) { // catches errors
            console.log(error);
        });
      }
    }
  };
}