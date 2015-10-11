'use strict';

describe('Controller: SimpleGameCtrl', function () {

  // load the controller's module
  beforeEach(module('sampleAppApp'));

  var SimpleGameCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SimpleGameCtrl = $controller('SimpleGameCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
