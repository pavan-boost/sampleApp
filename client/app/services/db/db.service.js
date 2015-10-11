'use strict';

angular.module('sampleAppApp')
  .service('db', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /* globals Firebase:false */
    
    var ref = new Firebase('https://luminous-inferno-4646.firebaseio.com/');
    this.createUserRecord = function(uid) {
      ref.child('users').child(uid).child('id').set(uid);
    };
  });
