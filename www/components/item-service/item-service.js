angular.module('item-service', ['firebase'])

.service('itemService', [ 'idService', '$firebaseArray' , function(idService, $firebaseArray) {
  //var array = [{id: 1, value: 'one'}, {id: 2, value: 'two'}, {id: 3, value: 'three'}];
  var ref = new Firebase("https://nitrous-demo.firebaseio.com/items");
  var items = $firebaseArray(ref);

  this.addItem = function(item) {
    items.$add({value: item});
  };

  this.removeItem = function(itemsToDelete) {
    itemsToDelete.forEach(function(item) {
      var index = items.$indexFor(item.$id);
      if(index > -1){
        items.$remove(index);
      }
    });
  };
  
  this.editItem = function(item) {
    
      items.$save(item);
  };

  this.items = function() {
    return items;
  };

}]);