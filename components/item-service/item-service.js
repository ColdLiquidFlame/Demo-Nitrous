angular.module('item-service', [])

.service('itemService', [ 'idService', function(idService) {
  var array = [{id: 1, value: 'one'}, {id: 2, value: 'two'}, {id: 3, value: 'three'}];
  
  function arrayObjectIndexOf(myArray, searchTerm, property) {
      for(var i = 0, len = myArray.length; i < len; i++) {
          if (myArray[i][property] === searchTerm) return i;
      }
      return -1;
  }

  this.addItem = function(item) {
    var obj = {
      id: idService.Guid(),
      value: item
    };

    array.push(obj);
  };

  this.removeItem = function(items) {
    items.forEach(function(item) {
      var index = arrayObjectIndexOf(array, item.id, 'id');

      array.splice(index, 1);

    });
  };
  
  this.editItem = function(item) {
    var index = arrayObjectIndexOf(array, item.id, 'id');
    array[index] = item;
  };

  this.items = function() {
    return array;
  };

}]);