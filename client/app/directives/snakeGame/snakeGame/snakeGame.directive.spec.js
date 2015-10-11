'use strict';

describe('Directive: snakeGame', function () {

  // load the directive's module
  beforeEach(module('sampleAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<snake-game></snake-game>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the snakeGame directive');
  }));
});