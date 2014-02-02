'use strict';

angular.module('nbsdemoApp')
  .directive('impactGraph', function (Util, Creategraph) {

  	/**
  	  * Produce a simplified data structure of daily artist activity
	  */
  	function dailyActivity(startDate, endDate, eventData, metricData, artistId) {
		var firstDay = Util.dateToDays(startDate),
			lastDay = Util.dateToDays(endDate),
			prevMetrics = {},
			series = _.range(firstDay, lastDay + 1).map(function (day) { return { day: day }; });

		// Note: I normally prefer to do this kind of thing functionally, but
		// with the deep nesting of the data, I think the imperative approach
		// has a more clarity and the joins between the data more practical

		_(metricData.output.artists[artistId].metrics).each(function (rawMetricData, metricId) {
			var metricName = rawMetricData.metadata.name_,
				keyName = Object.keys(rawMetricData.endpoints),
				metricSeries = rawMetricData.endpoints[keyName].data.global.values.totals;

			_(metricSeries).each(function (dataPoint, day) {
				// Calculate change from previous value of the metric
				if (prevMetrics[metricName]) { series[day - firstDay][metricName + ' Change'] = dataPoint - prevMetrics[metricName]; }

				series[day - firstDay][metricName] = prevMetrics[metricName] = dataPoint;
			});

			// Fill in Change = 0 for missing values
			_(series).reject(metricName + ' Change').each(function (entry) { entry[metricName + ' Change'] = 0; });
		});

		_(eventData).forOwn(function (dayEventData, day) {
			if (_.isNaN(+day)) { return; }

			var events = series[day - firstDay].events = [];
			_(dayEventData.event_types).each(function (eventsByType) {
				_(eventsByType.events).each(function (eventData) {
					eventData.type = eventsByType.event_type_pretty;
					events.push(eventData);
				});
			});
		});

		return series;
	}

    return {
      templateUrl: 'views/impactgraph.html',
      restrict: 'E',
      controller: function ($scope) {
        Creategraph.go(dailyActivity($scope.startDate, $scope.endDate, $scope.currentArtistEvents, $scope.currentArtistMetrics, $scope.currentArtist.id));
      }
    };
  });
