angular.module('geocode-service', [])

.service('GeoCode', ['$http', 'GoogleApiKey', function($http, GoogleApiKey) {
	this.getAddress = function(latitude, longitude)	{
		return $http({
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			method: 'GET',
			params: {
				latlng: latitude + ',' + longitude,
				key: GoogleApiKey
			}
		});
	};

	this.getCoords = function(address)	{
		return $http({
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			method: 'GET',
			params: {
				address: address,
				key: GoogleApiKey
			}
		});
	};
}]);