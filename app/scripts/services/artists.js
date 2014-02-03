'use strict';

angular.module('nbsdemoApp')
  .service('Artists', function Artists($rootScope, $q, Nbs) {
    this.cache = {};
    this.addArtists = function (artistData) {
      var _this = this;

      // Cache all artist data by name
      _.each(artistData, function (data) {
        _this.cache[data.name] = data;
      });
    };
    this.setCurrent = function (artistName) {
      var _this = this;

      if ($rootScope.currentArtist && $rootScope.currentArtist.name === artistName) { return; }

      // Load the artist info from memory if we already have it (because we're
      // coming from a search). Otherwise execute the search to get the data.
      if (this.cache[artistName]) {
        $rootScope.currentArtist = this.cache[artistName];
      } else {
        Nbs.search({query: artistName}, function (result) {
          _this.addArtists(result.artists);
          $rootScope.currentArtist = _this.cache[artistName];
        });
      }
    };
  });
