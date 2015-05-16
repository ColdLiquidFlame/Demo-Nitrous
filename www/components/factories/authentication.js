angular.module('authentication-factory', ['firebase', 'user-factory'])

.factory('Auth', ['$firebaseAuth', '$rootScope', '$location', 'User', function($firebaseAuth, $rootScope, $location, User) {
  var ref = new Firebase("https://nitrous-demo.firebaseio.com/");
  var auth = $firebaseAuth(ref);

  auth.ref = ref;

  auth.$onAuth(function(authData) {

    if  (authData) {
      $rootScope.auth = authData;
      
      switch (authData.provider) {
        case "password": 
          $rootScope.isPassword = true;
          $rootScope.user = User.GetUser(authData.uid);
          break;
        case "google": 
          $rootScope.isGoogle = true;
          $rootScope.user = User.UpdateUser(authData.uid, authData.google);
          break;
        case "facebook": 
          $rootScope.isFacebook = true;
          $rootScope.user = User.UpdateUser(authData.uid, authData.facebook);
      }
    }
    else {
      $rootScope.auth = null;
      $rootScope.user = null;
      $location.path('/main');
    }
  });
  
  return auth;
}]);