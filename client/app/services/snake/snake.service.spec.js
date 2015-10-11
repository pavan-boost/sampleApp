'use strict';

describe('Service: snake', function () {

  // load the service's module
  beforeEach(module('sampleAppApp'));

  // instantiate service
  var snake;
  beforeEach(inject(function (_snake_) {
    snake = _snake_;
  }));

  it('should do something', function () {
    expect(!!snake).toBe(true);
  });

});
