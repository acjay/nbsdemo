'use strict';

describe('Directive: artistData', function () {

  // load the directive's module
  beforeEach(module('nbsdemoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<artist-data></artist-data>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the artistData directive');
  }));
});
