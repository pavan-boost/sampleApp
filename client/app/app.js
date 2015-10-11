'use strict';

angular.module('sampleAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'firebase',
  'oitozero.ngSweetAlert'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, auth, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(!auth.getAuth() && toState.name !== 'main') {
        event.preventDefault();
        $state.go('main');
      }
    });
  });
