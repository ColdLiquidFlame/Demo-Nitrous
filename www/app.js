angular.module('myApp', ['ngRoute',
  'ngMessages',
  /*** Components ***/
  'modify-item-directive',
  'item-service',
  'list-item-directive',
  'authentication-factory',
  'uiGmapgoogle-maps',
  /*** Views ***/
  'myApp.main',
  'myApp.lists',
  'myApp.navbars',
  'myApp.login',
  'myApp.register',
  'myApp.locomotive-reports',
  'myApp.reports',
  'myApp.recent-reports',
  'myApp.locomotive-reports-add'
])

.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, current, error) {
    if (error === 'AUTH_REQUIRED') {
      $location.path('/login' + next.$$route.originalPath);
    }
  });
  
  $rootScope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
}])

//.constant('GoogleApiKey', 'AIzaSyBvpqHEJsqyEfSgT7TcZ1MUlWrrZoRkVgE')
.constant('GoogleApiKey', 'AIzaSyB4g4PaWdcZcM0rEFh2DC4FJiO6MHqMAHg')

.constant('FirebaseUrl', 'https://nitrous-demo.firebaseio.com')
.constant('FirebaseUrlx', 'https://locomotive.firebaseio.com') 

/**** Configuration ****/
.config( function($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider, GoogleApiKey) {
  $routeProvider.otherwise({
    redirectTo: '/reports'
  });

  $locationProvider.html5Mode(true);
  
  uiGmapGoogleMapApiProvider.configure({
      key: GoogleApiKey,
      v: '3.19'
    });
});
