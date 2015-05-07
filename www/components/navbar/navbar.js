angular.module('myApp.navbars', ['authentication-factory'])

.controller('NavBarCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
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
  
  $scope.logout = function() {
    Auth.$unauth();
  };
  
  UpdateNavbar();
}]);