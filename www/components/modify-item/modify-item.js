angular.module('modify-item-directive', [])

.directive('modifyItem', ['itemService', function(itemService) {
  return {
    restrict: 'E',
    templateUrl: 'components/modify-item/modify-item.html',
    scope: {
      items: '=listItems',
      selectedItem: '='
    },
    controller: ['$scope', function($scope) {
          $scope.$watch('selectedItem', function(newValue) {
            $scope.currentItem = angular.copy($scope.selectedItem);
          });
      
          /**** Add ****/
          $scope.beginItemAdd = function() {
            $scope.isAdd = true;
          };
          
          /**** Save ****/
          $scope.save = function() {
            if($scope.isAdd) {
              itemService.addItem($scope.currentItem);
            } else {//if($scope.isEdit) {
              $scope.selectedItem.value = $scope.currentItem.value;
              itemService.editItem($scope.selectedItem);
            }
                    
            $scope.cancelEdit();
          };
          
          /*** Cancel ****/
          $scope.cancelEdit = function() {
            $scope.showForm = false;
            $scope.currentItem = null;
            $scope.selectedItem = null;     
            $scope.isAdd = false;        
            $scope.isEdit = false;
          };
    
        }],
    link: function(scope, element, attr) {}
  };
}]);