angular.module('myApp', ['ngRoute', 'modify-item-directive', 'id-service', 'item-service', 'list-item-directive', 'myApp.main', 'myApp.lists'])

/**** Configuration ****/
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.otherwise({redirectTo: '/lists'});
  
  $locationProvider.html5Mode(true);
}]);