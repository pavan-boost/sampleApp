'use strict';

angular.module('sampleAppApp')
  .controller('NavbarCtrl', function ($scope, $location, auth) {
    $scope.menu = [{
      'title': 'simpleGame',
      'link': '/simpleGame'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.logout = function() {
      auth.logout();
    };
  });
