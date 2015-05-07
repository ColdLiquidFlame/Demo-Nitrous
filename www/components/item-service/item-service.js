angular.module('item-service', ['firebase'])

.service('itemService', [ '$firebaseArray' , function($firebaseArray) {
  var ref = new Firebase("https://nitrous-demo.firebaseio.com/items");
  var items = $firebaseArray(ref);

  this.addItem = function(item) {
    items.$add(item);
  };

  this.removeItem = function(item) {
    items.$remove(item);
  };
  
  this.editItem = function(item) {
    
      items.$save(item);
  };

  this.items = function() {
    return items;
  };

}]);