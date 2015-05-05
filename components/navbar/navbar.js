angular.module('myApp.navbars', [])

.controller('NavBarCtrl', ['$scope', '$location', function($scope, $location) {
  function UpdateNavbar() {
    $scope.navbar = {};
    switch($location.$$url) {
      case '/main': 
        $scope.navbar.main = true;  
        break;
      case'/lists': 
        $scope.navbar.lists = true;
        break;
    }
  }
  
  $scope.$on('$locationChangeStart', function(event) {
    UpdateNavbar();
  });
  
  UpdateNavbar();
}]);