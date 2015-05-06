angular.module('myApp.lists', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/lists', {
      controller: 'ListsCtrl',
      templateUrl: 'lists/lists.html'
    });
}])

.controller('ListsCtrl', ['$scope', 'itemService', function($scope, itemService) {
  $scope.items = itemService.items();
  $scope.newItem = null;
  $scope.selectedItems = null;  
}]);