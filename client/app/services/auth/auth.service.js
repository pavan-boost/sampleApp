'use strict';

angular.module('sampleAppApp')
  .factory('auth', function ($firebaseAuth) {
    // Service logic
    /* globals Firebase:false */
    var ref = new Firebase('https://luminous-inferno-4646.firebaseio.com/');
    var authObj = $firebaseAuth(ref);


    return {
      createUser: function(user, cb) {
        authObj.$createUser({
          email: user.email,
          password: user.password
        }).then(function(authData) {
          cb(true, authData, user);
        }).catch(function(err){
          cb(false, err);
        });
      },

      login: function(user, cb) {
        authObj.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(authData) {
          cb(true, authData);
        }).catch(function(err) {
          cb(false, err);
        });
      },

      logout: function() {
        authObj.$unauth();
      },

      requireAuth: function() {
        return authObj.$requireAuth();
      },

      waitForAuth: function() {
        return authObj.$waitForAuth();
      },

      getAuth: function() {
        return authObj.$getAuth();
      }

    };
  });
