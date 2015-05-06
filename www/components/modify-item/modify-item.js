angular.module('modify-item-directive', [])

.directive('modifyItem', ['itemService', function(itemService) {
  return {
    restrict: 'E',
    templateUrl: 'components/modify-item/modify-item.html',
    scope: {
      items: '=listItems',
      selectedItems: '='
    },
    controller: function($scope) {
      /**** Add ****/
      $scope.beginItemAdd = function() {
        $scope.isAdd = true;
      };
      
      /**** Edit ****/
      $scope.beginItemEdit = function() {
        $scope.isEdit = true;
        var singleItem = $scope.selectedItems[0];
        $scope.newItem = singleItem.value;
      };
      
      /**** Save ****/
      $scope.save = function() {
        if($scope.isAdd) {
          itemService.addItem($scope.newItem);
        } else if($scope.isEdit) {
          var item = $scope.selectedItems[0];
          item.value = $scope.newItem;
          itemService.editItem(item);
        }
                
        $scope.cancelEdit();
      };
      
      /**** Delete ****/
      $scope.deleteItem = function() {
        itemService.removeItem($scope.selectedItems);
        $scope.selectedItems = null;
      };
      
      /*** Cancel ****/
      $scope.cancelEdit = function() {
        $scope.showForm = false;
        $scope.newItem = null;        
        $scope.isAdd = false;        
        $scope.isEdit = false;
      };

    },
    link: function(scope, element, attr) {}
  };
}]);