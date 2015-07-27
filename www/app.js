angular.module('myApp', ['ngRoute',
  'ngMessages',
  /*** Components ***/
  'modify-item-directive',
  'item-service',
  'list-item-directive',
  'authentication-factory',
  /*** Views ***/
  'myApp.main',
  'myApp.lists',
  'myApp.navbars',
  'myApp.login',
  'myApp.register',
  'myApp.locomotive-reports',
  'myApp.reports',
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

/**** Configuration ****/
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
}]);
