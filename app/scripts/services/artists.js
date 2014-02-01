'use strict';

angular.module('nbsdemoApp')
  .service('Artists', function Artists($rootScope, $q, Nbs) {
  	this.cache = {};
    this.addArtists = function (artistData) {
    	var _this = this;

    	// cache all artist data by name
    	_.each(artistData, function (data) {
    		_this.cache[data.name] = data;
    	});
    };
    this.setCurrent = function (artistName) {
    	var _this = this;

        if ($rootScope.currentArtist && $rootScope.currentArtist.name === artistName) { return; }

    	if (this.cache[artistName]) {
    		$rootScope.currentArtist = this.cache[artistName];
    	} else {
    		Nbs.search(artistName, function (result) {
    			_this.addArtists(result.artists);
    			$rootScope.currentArtist = _this.cache[artistName];
    		});
    	}
    };
  });
