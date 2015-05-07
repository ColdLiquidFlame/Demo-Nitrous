angular.module('myApp.login', ['ngRoute', 'authentication-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    })
   .when('/login/:redirect', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    });
}])

.controller('LoginCtrl', ['$scope', 'Auth', '$routeParams', '$location', function($scope, Auth, $routeParams, $location) {
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
}]);