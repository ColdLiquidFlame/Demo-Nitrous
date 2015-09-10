angular.module('myApp.locomotive-reports-add', ['ngRoute', 'authentication-factory', 'uiGmapgoogle-maps', 'geocode-service', 'mgcrea.ngStrap.datepicker', 'mgcrea.ngStrap.typeahead'])

//.constant('GoogleApiKey', 'AIzaSyBvpqHEJsqyEfSgT7TcZ1MUlWrrZoRkVgE')

.config(
  function($routeProvider, uiGmapGoogleMapApiProvider, /*GoogleApiKey,*/ $datepickerProvider) {
    $routeProvider
      .when('/reports/new', {
        controller: 'LocomotiveReportNewCtrl',
        templateUrl: 'add-locomotive-report/add-locomotive-report.html',
        resolve: {
          "currentAuth": function(Auth, $location) {
              return Auth.$requireAuth();
            }
        }
      })
      .when('/:locomotiveNumber/reports/new', {
        controller: 'LocomotiveReportNewCtrl',
        templateUrl: 'add-locomotive-report/add-locomotive-report.html',
        resolve: {
          "currentAuth": function(Auth, $location) {
              return Auth.$requireAuth();
            }
        }
    });
    
//     uiGmapGoogleMapApiProvider.configure({
//       key: GoogleApiKey,
//       v: '3.19'
//     });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'MM/dd/yyyy',
      autoclose: true
    });
  }
)

.controller('LocomotiveReportNewCtrl',
  function($scope, $location, $window, LocomotiveReport, uiGmapIsReady, GeoCode, currentAuth, Auth, $routeParams) {
    Auth.$onAuth(function(authData) {
      if (!authData) {
        returnToReportsPage();
      }
    });
    
    if(angular.isDefined($routeParams.locomotiveNumber)) {
      $scope.locomotive = $routeParams.locomotiveNumber;
    }
  
    $scope.locomotives = [];
    $scope.map = {
      center: {
        latitude: 0,
        longitude: 0
      },
      zoom: 18,
      events: {
        dragend: function(map, eventName, args) {
          var lat = map.getCenter().lat(),
            lng = map.getCenter().lng();
          //getAddressFromLatLng(lat, lng);
        },
        dblclick: function(map, eventName, args) {
          var latLng = args[0].latLng;
          
          $scope.marker.coords.longitude = latLng.lng();
          $scope.marker.coords.latitude = latLng.lat();
          
          map.setCenter(latLng);
          //map.panTo(latLng);   
          
          getAddressFromLatLng(latLng.lat(), latLng.lng());
        }
      }
    };
    $scope.marker = {
      id: 1,
      coords: {
        longitude: 0,
        latitude: 0
      },
      options: {
        draggable: true
      },
      events: {
        dragend: function(marker, eventName, model, args) {
          var lat = marker.getPosition().lat(),
            lng = marker.getPosition().lng();
          getAddressFromLatLng(lat, lng);
        }
      }
    };
    $scope.datePickerOptions = {
      autoclose: true,
      orientation: 'auto',
      todayHighlight: true
    };
    
    $scope.dateSpotted = new Date();
    getAddressFromLatLng = function(latitude, longitude) {
      GeoCode.
      getAddress(latitude, longitude).
      success(function(data) {
        if (data.results.length > 0) {
          $scope.location = data.results[0].formatted_address;
          $scope.address = data.results[0];
        }
      }).
      error(function(data) {});
    };
    updateCurrentPosition = function(position) {
      var latLng = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      var latLng2 = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      $scope.map.center = latLng;
      $scope.marker.coords = latLng2;
      getAddressFromLatLng(position.coords.latitude, position.coords.longitude);
    };
    
    uiGmapIsReady.promise().then(function(maps) {
      $window.navigator.geolocation.getCurrentPosition(updateCurrentPosition);
    });
    
    $scope.submitReport = function(form) {
      if (form.$invalid) {
        return;
      }
      var report = {
        locomotiveNumber: angular.isObject($scope.locomotive) ? $scope.locomotive.name : $scope.locomotive,
        dateSpotted: $scope.dateSpotted.toJSON(),
        location: $scope.marker.coords,
        address: $scope.location,
        reportedBy: currentAuth.uid,
        reported: (new Date()).toJSON()
      };
      LocomotiveReport.Add(report).then(function(data) {
        $scope.returnToReportsPage();
      });
    };
    $scope.updateMap = function() {
      GeoCode.
      getCoords($scope.location).
      success(function(data) {
        if (data.results.length < 1) {
          return;
        }
        var location = data.results[0].geometry.location;
        var position = {
          coords: {
            latitude: location.lat,
            longitude: location.lng
          }
        };
        updateCurrentPosition(position);
      }).
      error(function(data) {});
    };
  
    $scope.returnToReportsPage = function() {
      if(angular.isDefined($routeParams.locomotiveNumber)) {
        $location.path('/' + $routeParams.locomotiveNumber + '/reports');
      }
      else {
        $window.history.back();  
      }
    };
    
    LocomotiveReport.GetAllLocomotives().then(function(locomotives) {
      $scope.locomotives = locomotives;
    });
  }
);
