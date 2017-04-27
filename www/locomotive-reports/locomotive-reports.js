angular.module('myApp.locomotive-reports', ['ngRoute', 
                                            'authentication-factory', 
                                            'locomotive-factory', 
                                            'geocode-service'])

.config(
  function($routeProvider) {
    $routeProvider
      .when('/:locomotiveNumber/reports', 
            {
              controller: 'LocomotiveReportsCtrl',
              templateUrl: 'locomotive-reports/locomotive-reports.html'
            });
    })

.controller(
      'LocomotiveReportsCtrl', 
      function($scope, $routeParams, LocomotiveReport, GeoCode, $window, uiGmapIsReady) {
        $scope.locomotiveNumber = $routeParams.locomotiveNumber;
        $scope.locomotiveReports = [];
        
         uiGmapIsReady
           .promise()
           .then(function(map) {
             LocomotiveReport
               .GetReportByLocomotiveNumber($scope.locomotiveNumber)
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
        
        $scope.goBack = function() {
          $window.history.back();
        };
    });
