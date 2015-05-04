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
      $scope.showForm = false;
      $scope.saveItem = function() {
        itemService.addItem($scope.newItem);
        $scope.newItem = null;
        $scope.showForm = false;
      };
      $scope.addItem = function() {
        itemService.removeItem($scope.selectedItems);
        $scope.selectedItems = null;
      };
      $scope.deleteItem = function() {
        itemService.removeItem($scope.selectedItems);
        $scope.selectedItems = null;
      };
      $scope.beginItemEdit = function() {
        $scope.isEdit = true;
        $scope.showForm = true;
        var singleItem = $scope.selectedItems[0];
        $scope.newItem = singleItem.value;
      };
      $scope.endItemEdit = function() {
        $scope.showForm = false;
        var singleItem = $scope.selectedItems[0];
        singleItem.value = $scope.newItem;
      };
      $scope.cancelEdit = function() {
        $scope.showForm = false;
        $scope.newItem = null;
      };

    },
    link: function(scope, element, attr) {}
  };
}]);