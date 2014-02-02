'use strict';

describe('Controller: ArtistCtrl', function () {

  // load the controller's module
  beforeEach(module('nbsdemoApp'));

  var ArtistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtistCtrl = $controller('ArtistCtrl', {
      $scope: scope
    });
  }));

});
