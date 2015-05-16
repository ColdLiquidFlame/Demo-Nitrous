angular.module('myApp.navbars', ['authentication-factory'])

.controller('NavBarCtrl', ['$scope', '$location', 'Auth', '$rootScope', function($scope, $location, Auth, $rootScope) {
  function UpdateNavbar() {
    $scope.navbar = {};
    switch($location.$$url) {
      case '/main': 
        $scope.navbar.main = true;  
        break;
      case'/lists': 
        $scope.navbar.lists = true;
        break;
      case'/locomotive/reports': 
        $scope.navbar.locomotive = true;
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