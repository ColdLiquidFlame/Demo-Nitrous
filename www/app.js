angular.module('myApp', ['ngRoute',                          
                         /*** Components ***/
                         'modify-item-directive', 
                         'id-service', 
                         'item-service', 
                         'list-item-directive', 
                         /*** Views ***/
                         'myApp.main', 
                         'myApp.lists', 
                         'myApp.navbars'
                        ])

/**** Configuration ****/
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider.otherwise({redirectTo: '/lists'});
}]);