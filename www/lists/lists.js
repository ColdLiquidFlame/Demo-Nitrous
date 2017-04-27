angular.module('myApp.lists', ['ngRoute', 'authentication-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/lists', {
      controller: 'ListsCtrl',
      templateUrl: 'lists/lists.html',
       resolve: {
         "currentAuth": ['Auth', '$location', function(Auth, $location) {
           return Auth.$requireAuth();
         }]
       }
    });
}])

.controller('ListsCtrl', ['$scope', 'itemService', 'currentAuth', '$location', 'Auth', function($scope, itemService, currentAuth, $location, Auth) {
  $scope.items = itemService.items();
  $scope.newItem = null;
  $scope.selectedItem = null;
  
  
}]);