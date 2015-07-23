angular.module('myApp.main', ['ngRoute', 'uiGmapgoogle-maps', 'locomotive-factory'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainCtrl',
      templateUrl: 'main/main.html'
    });
})

.controller('MainCtrl', function($scope, Auth, LocomotiveReport, uiGmapGoogleMapApi, uiGmapIsReady) {
  $scope.reports = [];
  
  uiGmapIsReady.promise()
    .then(function(map) {
    LocomotiveReport.GetAllReports().then(function(reports) {
      $scope.reports = reports;
    });
  });

  $scope.map = {
    center: {
      latitude: '40.1451',
      longitude: '-99.6680'
    },
    zoom: 4
  };
});
