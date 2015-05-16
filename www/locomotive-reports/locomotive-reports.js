angular.module('myApp.locomotive-reports', ['ngRoute', 'authentication-factory', 'locomotive-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/locomotive/reports', {
      controller: 'AllReportsCtrl',
      templateUrl: 'locomotive-reports/locomotive-reports.html'
    });
}])

.controller('AllReportsCtrl', ['$scope', 'LocomotiveReport', function($scope, LocomotiveReport) {
   
  $scope.locomotiveReports = LocomotiveReport.GetAllReports();  

  $scope.deleteReport = function(reportId) {
        reportService.deleteReport(reportId).
        success(function() {
            getAllReports();
        });
    };


    $scope.deleteSelectedReports = function() {

        var filtered = $scope.locomotiveReports.filter(function(report) {
            return report.selected  === true;
        });

        for(var i = 0; i < filtered.length; i++)
        {
        	var report = filtered[i];
        	delete report.selected;

            LocomotiveReport.Remove(filtered[i])
            .then(reportRemoved)
            .catch(reportRemovedError);
        }
    };

    $scope.showDeleteButton = function() {
        return $scope.numberOfSelectedReports() > 0;
    };

    $scope.numberOfSelectedReports = function() {
        var result = 0;

        if ($scope.locomotiveReports !== undefined) {
            for (i = 0; i < $scope.locomotiveReports.length; i++) {
                if ($scope.locomotiveReports[i].selected) {
                    result++;
                }
            }
        }

        return result;
    };

    $scope.deleteButtonText = function() {
    	var buttonText = 'Delete selected report';
    	if ($scope.numberOfSelectedReports() > 1) {
    		buttonText += 's';
    	}

    	return buttonText;
    };

    function reportRemoved(data) {

    }

    function reportRemovedError(error) {

    }

}]);