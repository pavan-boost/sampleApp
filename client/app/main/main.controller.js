'use strict';

angular.module('sampleAppApp')
  .controller('MainCtrl', function ($scope, $http, $stateParams, auth, db, $state, SweetAlert) {
    $scope.awesomeThings = [];
    $scope.page = $stateParams.type;

    var createUserRecord = function(success, authData, user) {
      if (success) {
        $scope.login(user.email, user.password);
        db.createUserRecord(authData.uid);
      } else {
        console.log('err:', authData);
        $scope.error = authData.message;
      }
    };

    $scope.register = function(email, password) {
      $scope.error = '';
      auth.createUser({
        email: email,
        password: password,
      }, createUserRecord);
    
    };

    var changeState = function(success, authErr) {
      if (success) {
        console.log('successfully loggedin');
        SweetAlert.swal({
          title: 'Welcome',
          text: 'Nothing much to see inside Unless..',
          timer: 3000,
          showConfirmButton: false
        });
        $state.go('simpleGame');
      } else {
        $scope.error = authErr;
      }
    };

    $scope.login = function(email, password) {
      console.log('email:', email);
      console.log('pass:', password);
      auth.login({
        email: email,
        password: password
      }, changeState);
    };

    $scope.changePage = function(page) {
      $scope.page = page;
    };

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
