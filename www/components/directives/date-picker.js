angular.module('date-picker', [])

.directive('datePicker', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			angular.element(element).datepicker(scope[attrs.datePicker]);
		}
	};
}]);