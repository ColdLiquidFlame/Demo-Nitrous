angular.module('authentication-factory', ['firebase', 'user-factory'])

.factory('Auth', ['$firebaseAuth', '$rootScope', '$location', 'User', function($firebaseAuth, $rootScope, $location, User) {
  var ref = new Firebase("https://nitrous-demo.firebaseio.com/");
  var auth = $firebaseAuth(ref);
  
  auth.$onAuth(function(authData) {
    if  (authData) {
      $rootScope.auth = authData;
      
      $rootScope.user = User(authData.uid);
    }
    else {
      $rootScope.auth = null;
      $rootScope.user = null;
      $location.path('/main');
    }
  });
  
  return auth;
}])
;