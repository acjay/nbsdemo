'use strict';

angular.module('nbsdemoApp')
  .directive('search', function () {
    return {
      templateUrl: 'views/search.html',
      restrict: 'E'
    };
  });
