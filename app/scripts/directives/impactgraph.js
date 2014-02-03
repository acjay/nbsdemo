'use strict';

angular.module('nbsdemoApp')
  .directive('impactGraph', function (Util, Creategraph) {

    /**
      * Produce a simplified data structure of daily artist activity, with 
      * metric data and event data combined
      */
    function dailyActivity(startDate, endDate, eventData, metricData, artistId) {
      var firstDay = Util.dateToDays(startDate),
        lastDay = Util.dateToDays(endDate),
        prevMetrics = {},
        series = _.range(firstDay, lastDay + 1).map(function (day) { return { day: day }; }),
        metricTypes = {},
        eventTypes = {};

      // Note: I normally prefer to do this kind of thing functionally, but
      // with the deep nesting of the data, I think the imperative approach
      // has a more clarity and the joins between the data more practical

      // Simplify the structure of the metric data and assing into the series
      _(metricData.output.artists[artistId].metrics).each(function (rawMetricData, metricId) {
        var metricName = rawMetricData.metadata.name_,
          keyName = Object.keys(rawMetricData.endpoints),
          metricSeries = rawMetricData.endpoints[keyName].data.global.values.totals;

        // Store metric metadata once per metric type
        if (!metricTypes[metricId]) { metricTypes[metricId] = rawMetricData.metadata; }

        _(metricSeries).each(function (dataPoint, day) {
          // Calculate change from previous value of the metric
          if (prevMetrics[metricName]) { series[day - firstDay][metricName + ' Change'] = dataPoint - prevMetrics[metricName]; }

          series[day - firstDay][metricName] = prevMetrics[metricName] = dataPoint;
        });

        // Fill in Change = 0 for missing values
        _(series).reject(metricName + ' Change').each(function (entry) { entry[metricName + ' Change'] = 0; });
      });

      // Add all event data to the series by date
      _(eventData).forOwn(function (dayEventData, day) {
        // Reject attributes angular's $resource adds on to the data
        if (_.isNaN(+day)) { return; }

        var events = series[day - firstDay].events = [];
        _(dayEventData.event_types).each(function (eventsByType, eventTypeId) {
          // Store event metadata once per metric type
          if (!eventTypes[eventTypeId]) { eventTypes[eventTypeId] = _.pick(eventsByType, ['event_type_pretty', 'event_weight']); }

          _(eventsByType.events).each(function (eventData) {
            eventData.type = eventsByType.event_type_pretty;
            events.push(eventData);
          });
        });
      });

      return {
        data: series,
        metricMetadata: metricTypes,
        eventMetadata: eventTypes
      };
    }

    return {
      templateUrl: 'views/impactgraph.html',
      restrict: 'E',
      controller: function ($scope) {
        var chartInfo = dailyActivity($scope.startDate, $scope.endDate, $scope.currentArtistEvents, $scope.currentArtistMetrics, $scope.currentArtist.id); 

        $scope.metricTypes = _.pairs(chartInfo.metricMetadata);

        // Default to whatever the first metric is
        $scope.selectedMetric = $scope.metricTypes[0][0];

        // Redo the graph whenever a new metric is selected. This will also 
        // kick off the first rendering when the checkbox gets selected on the
        // first render
        $scope.$watch('selectedMetric', function (selectedMetric) {
          Creategraph.go(chartInfo, selectedMetric);          
        });
      }
    };
  });
