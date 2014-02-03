'use strict';

angular.module('nbsdemoApp')
  .directive('search', function () {

    return {
      templateUrl: 'views/search.html',
      restrict: 'E',
      controller: function ($scope, Nbs, Artists) {
        $scope.loading = false;

        $scope.search = function () {
          // TODO: add error handling for when search fails
          Nbs.search({query: $scope.searchText}, function (result) {
            $scope.result = result;

            // cache the search result data
            Artists.addArtists(result.artists);

            $scope.loading = false;
          });
          
          $scope.loading = true;
        }
      }
    };
  });