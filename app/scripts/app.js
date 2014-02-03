'use strict';

angular.module('nbsdemoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMockE2E',
  'ng-bootstrap-datepicker'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // I would definitely prefer to use artistId here instead of name, but
      // I don't know the API endpoint to get artist data by known IDs
      .when('/artist/:artistName', {
        templateUrl: 'views/main.html',
        controller: 'ArtistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($httpBackend) {
    // $httpBackend.whenGET(/https:\/\/api\.nextbigsound\.com\/search\/v1\/artists/).respond(window.mockData.searchResponse);
    // $httpBackend.whenGET(/https:\/\/api\.nextbigsound\.com\/events\/v1\/artists/).respond(window.mockData.eventsResponse);
    // $httpBackend.whenGET(/https:\/\/api\.nextbigsound\.com\/metrics\/v1/).respond(window.mockData.metricsResponse);
    $httpBackend.whenGET(/.*/).passThrough();
  });
