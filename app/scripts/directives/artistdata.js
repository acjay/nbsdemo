'use strict';

angular.module('nbsdemoApp')
	.directive('artistData', function () {
		return {
			templateUrl: 'views/artistdata.html',
			restrict: 'E',
			controller: function ($scope, $q, Nbs, Util) {
				$scope.datepickerOptions = {
					format: 'yyyy-mm-dd',
					language: 'en',
					autoclose: true,
					weekStart: 0
				};

				// Set initial view state
				$scope.startDate = '2013-07-13';
				$scope.endDate = '2013-09-01';
				$scope.dataLoaded = false;
				$scope.loading = false;

				$scope.loadData = function () {
					var artist = $scope.currentArtist,
							currentArtistEvents = Nbs.events({
							artistId: artist.id,
							start: Util.dateToDays($scope.startDate),
							end: Util.dateToDays($scope.endDate)
						}).$promise,
						currentArtistMetrics = Nbs.metrics({
							entities: artist.id,
							start: $scope.startDate,
							end: $scope.endDate
						}).$promise;

					// Trigger the loading of the impact graph when all data
					// has arrived
					// TODO: add error handling for failure to load
					$q.all([currentArtistEvents, currentArtistMetrics]).then(function (results) {
						console.log('New results loaded');

						$scope.dataLoaded = true;
						$scope.currentArtistData = {
							events: results[0],
							metrics: results[1]
						};
						$scope.loading = false;
					});

					$scope.loading = true;
				};


			}
		};
	});