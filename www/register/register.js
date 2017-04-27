angular.module('myApp.register', ['ngRoute', 'authentication-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/register', {
      controller: 'RegisterCtrl',
      templateUrl: 'register/register.html'
    });
}])

.controller('RegisterCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.register = function() {
    var userLogin = {
        email: $scope.user.email,
        password: $scope.user.password
      };
    Auth.$createUser(userLogin)
    .then(function(userData) {      
      Auth.$authWithPassword(userLogin)
      .then(function(authData) {
        $scope.user.provider = authData.provider;
        delete $scope.user.password;
        
        var ref = new Firebase("https://nitrous-demo.firebaseio.com/");
        ref.child('users')
           .child(userData.uid)
           .set($scope.user);
        
        $location.path('/main');
      })
      .catch(function(error) {
        console.log("Error: ", error);
      });
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
  };
}]);