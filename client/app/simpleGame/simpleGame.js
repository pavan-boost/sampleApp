'use strict';

angular.module('sampleAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('simpleGame', {
        url: '/simpleGame',
        templateUrl: 'app/simpleGame/simpleGame.html',
        controller: 'SimpleGameCtrl',
        resolve: {
          'currentAuth': ['auth', function(auth) {
            return auth.requireAuth();
          }]
        }
      });
  });
