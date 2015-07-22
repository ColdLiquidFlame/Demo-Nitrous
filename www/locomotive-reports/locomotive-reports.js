angular.module('myApp.locomotive-reports', ['ngRoute', 'authentication-factory',
  'locomotive-factory', 'geocode-service'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/:locomotiveNumber/reports', {
      controller: 'LocomotiveReportsCtrl',
      templateUrl: 'locomotive-reports/locomotive-reports.html'
    });
}])

.controller('LocomotiveReportsCtrl', function($scope, $routeParams,
  LocomotiveReport, GeoCode, $window) {
  //LocomotiveReport = new LocomotiveReport();
  $scope.locomotiveNumber = $routeParams.locomotiveNumber;


  LocomotiveReport.
  GetReportByLocomotiveNumber($scope.locomotiveNumber).
  then(function(reports) {
    // reports.forEach(function(report) {
    //   GeoCode.
    //   getAddress(report.location.latitude, report.location.longitude)
    //     .
    //   success(function(data) {
    //     if (data.results.length > 0) {
    //       report.address = data.results[0].formatted_address;
    //     }
    //   });
    // });

    $scope.locomotiveReports = reports;
  });

  $scope.goBack = function() {
    $window.history.back();
  };
});
