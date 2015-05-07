angular.module('user-factory', ['firebase'])

.factory('User', [ '$firebaseObject' , function($firebaseObject) {
  return function(uid) {
    var ref = new Firebase("https://nitrous-demo.firebaseio.com/users");
    var userRef = ref.child(uid);
    return $firebaseObject(userRef);
//       .$loaded()
//       .then(function(userObject) {
//         return userObject;
//       });
  };
}]);