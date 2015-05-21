angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
   .when('/', {
      controller: 'MainCtrl',
      templateUrl: 'main/main.html'
    });
//     .when('/main', {
//       controller: 'MainCtrl',
//       templateUrl: 'main/main.html'
//     });
}])

.controller('MainCtrl', ['$scope', 'Auth', function($scope, Auth) {
  
}]);