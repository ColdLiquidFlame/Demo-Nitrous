angular.module('myApp.main', ['ngRoute', 'uiGmapgoogle-maps', 'locomotive-factory'])

//.constant('GoogleApiKey', 'AIzaSyBvpqHEJsqyEfSgT7TcZ1MUlWrrZoRkVgE')

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainCtrl',
      templateUrl: 'main/main.html'
    });
  //     .when('/main', {
  //       controller: 'MainCtrl',
  //       templateUrl: 'main/main.html'
  //     });

  // uiGmapGoogleMapApiProvider.configure({
  //   key: GoogleApiKey,
  //   v: '3.19'
  // });
})

.controller('MainCtrl', function($scope, Auth, LocomotiveReport, uiGmapGoogleMapApi) {
  $scope.reports = [];

  uiGmapGoogleMapApi.then(function(map) {
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
