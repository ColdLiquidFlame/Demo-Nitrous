angular.module('list-item-directive', [])

.directive('listItem', [function() {
  return {
    restrict: 'E',
    templateUrl: 'components/list-item/list-item.html',
    scope: {
    	items: '=',
      selectedItems: '=',
      options: '=',
    },
    controller: function($scope) {
      $scope.$watch('items', function (newValue, oldValue, scope) {        
        $scope.selectedItems = [];
          angular.forEach(newValue, function(key, value) {
            if(key.selected) {
              var convertedItem = key;
              delete convertedItem.selected;
              $scope.selectedItems.push(convertedItem);
            }
          });
        
        
        
      }, true);
    }
  };
}]);