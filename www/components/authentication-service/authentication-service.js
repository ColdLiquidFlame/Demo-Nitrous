angular.module('authentication-factory', ['firebase'])

.factory('Auth', ['$firebaseAuth', '$rootScope', '$location', function($firebaseAuth, $rootScope, $location) {
  var ref = new Firebase("https://nitrous-demo.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  
  auth.$onAuth(function(authData) {
    if  (authData) {
      $rootScope.auth = authData;
    }
    else {
      $rootScope.auth = null;
      $location.path('/main');
    }
  });
  
  return auth;
}])
;