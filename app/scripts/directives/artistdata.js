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

				$scope.startDate = '2013-07-13';

				$scope.endDate = '2013-09-01';

				$scope.dataLoadCounter = {count: 0};

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

					$q.all([currentArtistEvents, currentArtistMetrics]).then(function (results) {
						$scope.dataLoadCounter.count++;
						$scope.currentArtistEvents = results[0];
						$scope.currentArtistMetrics = results[1];
					});
				};


			}
		};
	});