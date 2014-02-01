'use strict';

describe('Service: Nbs', function () {

  // load the service's module
  beforeEach(module('nbsdemoApp'));

  // instantiate service
  var Nbs;
  beforeEach(inject(function (_Nbs_) {
    Nbs = _Nbs_;
  }));

  it('should do something', function () {
    expect(!!Nbs).toBe(true);
  });

});
