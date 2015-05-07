angular.module('list-item-directive', [])

.directive('listItem', ['itemService', function(itemService) {
  return {
    restrict: 'E',
    templateUrl: 'components/list-item/list-item.html',
    scope: {
    	items: '=',
      selectedItem: '=',
      options: '=',
    },
    controller: ['$scope', function($scope) {
               $scope.delete = function (item) {
                itemService.removeItem(item);
               };

               $scope.edit = function (item) {
                $scope.selectedItem = item;
               };
    }]
  };
}]);