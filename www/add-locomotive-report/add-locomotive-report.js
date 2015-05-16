angular.module('myApp.locomotive-reports-add', ['ngRoute', 'authentication-factory', 'uiGmapgoogle-maps', 'geocode-service', 'date-picker'])

.constant('GoogleApiKey', 'AIzaSyBvpqHEJsqyEfSgT7TcZ1MUlWrrZoRkVgE')

.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', 'GoogleApiKey', function($routeProvider, uiGmapGoogleMapApiProvider, GoogleApiKey) {
   $routeProvider
    .when('/locomotive/reports/new', {
      controller: 'LocomotiveReportNewCtrl',
      templateUrl: 'add-locomotive-report/add-locomotive-report.html',
       resolve: {
         "currentAuth": ['Auth', '$location', function(Auth, $location) {
           return true;// Auth.$requireAuth();
         }]
       }
    });

    uiGmapGoogleMapApiProvider.configure({
      key: GoogleApiKey, //'AIzaSyDG_nsHsYKRblpfe-LJ8w6H5kw8Z0foGPg',
      v: '3.19'
    });
}])

.controller('LocomotiveReportNewCtrl', ['$scope', '$location', '$window', 'LocomotiveReport', 'uiGmapGoogleMapApi', 'GeoCode', 'currentAuth', function($scope, $location, $window, LocomotiveReport, uiGmapGoogleMapApi, GeoCode, currentAuth) {
    
    $scope.map = {
        center: {
            latitude:  0,
            longitude: 0
        },
        zoom: 18,
        events: {
            dragend: function(map, eventName, args) {
                var lat = map.getCenter().lat(),
                    lng = map.getCenter().lng();
                
                //getAddressFromLatLng(lat, lng);
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

    getAddressFromLatLng = function(latitude, longitude) {
        GeoCode.
            getAddress(latitude, longitude).
            success(function(data) { 
               if (data.results.length > 0) {
                   $scope.location = data.results[0].formatted_address;
                   $scope.address = data.results[0];
               }
            }).
            error(function(data){});
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

    uiGmapGoogleMapApi.then(function(maps) {
        $window.navigator.geolocation.getCurrentPosition(updateCurrentPosition);
    });

    $scope.submitReport = function(form) {
        if (form.$invalid) { return; }

        var report = {
            locomotiveNumber: $scope.locomotiveNumber,
            dateSpotted: $scope.dateSpotted,
            location: $scope.marker.coords,
            address: $scope.address
        };

        LocomotiveReport
            .Add(report)
            .then(function(data) {
                $location.path('/locomotive/reports');
            });
    };

    $scope.updateMap = function() {
        GeoCode.
            getCoords($scope.location).
            success(function(data) {
                if (data.results.length < 1) { return; }

                var location = data.results[0].geometry.location;
                var position = {
                    coords: {
                        latitude: location.lat,
                        longitude: location.lng
                    }
                };

                updateCurrentPosition(position);
            }).
            error(function(data){});
    };
}]);