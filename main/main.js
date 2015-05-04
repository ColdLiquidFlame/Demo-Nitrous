angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/main', {
      controller: 'MainCtrl',
      templateUrl: 'main/main.html'
    });
}])

.controller('MainCtrl', ['$scope', function($scope) {
  $scope.message = 'Hello World';
}])