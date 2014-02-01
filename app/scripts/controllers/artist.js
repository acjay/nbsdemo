'use strict';

angular.module('nbsdemoApp')
  .controller('ArtistCtrl', function ($routeParams, Artists) {
  	// set the current artist upon arrival from the router
  	Artists.setCurrent($routeParams.artistName);
  });
