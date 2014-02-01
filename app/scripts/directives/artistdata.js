'use strict';

angular.module('nbsdemoApp')
  .directive('artistData', function () {
    return {
      templateUrl: 'views/artistdata.html',
      restrict: 'E'
    };
  });
