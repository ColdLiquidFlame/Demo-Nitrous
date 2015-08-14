angular.module('myApp.reports', ['ngRoute', 'authentication-factory', 'locomotive-factory'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
    .when('/reports', {
      controller: 'AllReportsCtrl',
      templateUrl: 'reports/reports.html'
    });
}])

.controller('AllReportsCtrl', function($scope, LocomotiveReport, uiGmapIsReady) {
  $scope.locomotiveReports = [];

  //LocomotiveReport.GetAllReports();

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

    uiGmapIsReady
           .promise()
           .then(function(map) {
             LocomotiveReport
               .GetAllReports()
               .then(function(reports) {
                 $scope.locomotiveReports = reports;
             });
         });
  
  $scope.map = {
          center: {
            latitude: '40.1451',
            longitude: '-99.6680'
          },
          zoom: 4,
          markerEvents: {
            mouseover:function(marker, eventName, model, args) {
              
            },            
            mouseout:function(marker, eventName, model, args) {
              
            }
          }
        };
  
});
