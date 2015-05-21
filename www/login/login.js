angular.module('myApp.login', ['ngRoute', 'authentication-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html',
      reloadOnSearch: false
    })
   .when('/login/:redirect', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    });
}])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  function loginSuccess (authData) {
      $location.path('/');
  }
  
  $scope.loginWithPassword = function () {
    Auth.login('password', $scope.user)
    .then(loginSuccess)
    .catch(function(error) {
      $scope.errorMessage = "Invalid email or password";
    });
  };
  
  $scope.loginWithGoogle = function() {
    Auth.login('google', {scope: 'profile'})
    .then(loginSuccess)
    .catch(function(error) {
      $scope.errorMessage = "Invalid Google login";
    });
  };
  
  $scope.loginWithFacebook = function() {
    Auth.login('facebook')
    .then(loginSuccess)
    .catch(function(error) {
      $scope.errorMessage = "Invalid Facebook login";
    });
  };

}]);