'use strict';

describe('Service: Artists', function () {

  // load the service's module
  beforeEach(module('nbsdemoApp'));

  // instantiate service
  var Artists;
  beforeEach(inject(function (_Artists_) {
    Artists = _Artists_;
  }));

  it('should do something', function () {
    expect(!!Artists).toBe(true);
  });

});
