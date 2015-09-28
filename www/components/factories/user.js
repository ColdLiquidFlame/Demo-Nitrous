angular
  .module('user-factory', ['firebase'])
  .factory('User', function($firebaseObject, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "/users");
    
    var getUser = function(uid) {
      var userRef = ref.child(uid);
      return $firebaseObject(userRef);
    };

    var updateUser = function(uid, userData){
      var userRef = ref.child(uid);
      userRef.set(userData);
      return $firebaseObject(userRef);
    };

    return {
      GetUser: getUser,
      UpdateUser: updateUser
    };
});