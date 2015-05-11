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

.controller('LoginCtrl', ['$scope', 'Auth', '$routeParams', '$location', '$timeout', function($scope, Auth, $routeParams, $location, $timeout) {

  var authData = Auth.$getAuth();
  if (authData) {
    if(angular.isDefined($routeParams.redirect)) {
        $location.path("/" + $routeParams.redirect);
      } else {
        $location.path('/main');
      } 
  }

  $scope.login = function () {
    var authData = Auth.$authWithPassword($scope.user)
    .then(function(authData) {
      if(angular.isDefined($routeParams.redirect)) {
        $location.path("/" + $routeParams.redirect);
      } else {
        $location.path('/main');
      } 
    })
    .catch(function(error) {
      $scope.errorMessage = "Invalid email or password";
    });
  };
  $scope.loginWithGoogle = function() {
    var options = {
      scope: 'profile'
    };

    login('google', options)
    .then(function(authData) {
      if(angular.isDefined($routeParams.redirect)) {
        $location.path("/" + $routeParams.redirect);
      } else {
        $location.path('/main');
      } 
    })
    .catch(function(error) {
      $scope.errorMessage = "Invalid Google login";
    });
  };
  $scope.loginWithFacebook = function() {
    login('facebook')
    .then(function(authData) {
      if(angular.isDefined($routeParams.redirect)) {
        $location.path("/" + $routeParams.redirect);
      } else {
        $location.path('/main');
      } 
    })
    .catch(function(error) {
      $scope.errorMessage = "Invalid Facebook login";
    });
  };

  var login = function(provider, options) {
    return Auth.$authWithOAuthPopup(provider, options);
  };

}]);