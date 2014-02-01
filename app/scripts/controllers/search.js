'use strict';

angular.module('nbsdemoApp')
  .controller('SearchCtrl', function ($scope, Nbs) {
    $scope.search = function () {
    	Nbs.search({query: $scope.searchText});
    }
  });
