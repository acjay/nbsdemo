'use strict';

angular.module('nbsdemoApp')
  .service('Nbs', function Nbs($resource) {
    // Access NBS API through $resource 
    return $resource('https://api.nextbigsound.com', {
      access_token: 'dc5a3f6d5356e2721b8d381643f23d21'
    }, {
      search: {
        method: 'GET',
        url: 'https://api.nextbigsound.com/search/v1/artists/',
        params: {
          limit: 15
        }
      },
      events: {
        method: 'GET',
        url: 'https://api.nextbigsound.com/events/v1/artists/:artistId'
      },
      metrics: {
        method: 'GET',
        url: 'https://api.nextbigsound.com/metrics/v1/entityData',
        params: {
          metrics: '11,28'
        }
      }
    });
  });
