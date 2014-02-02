'use strict';

angular.module('nbsdemoApp')
  .service('Creategraph', function Creategraph(Util) {
    this.go = function generateGraph(data) {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          spacing = 40,
          width = 700 - margin.left - margin.right,
          totalHeight = 700 - margin.top - margin.bottom,
          metricChangeHeight = 500,
          eventHeight = totalHeight - metricChangeHeight - spacing;

      // Convert day indices to d3-compliant dates
      data.forEach(function (d) {
        d.day = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(Util.daysToDate(d.day).toISOString());
      });

      var x = d3.time.scale()
          .range([0, width])
          .domain(d3.extent(data, function(d) { return d.day; }));

      var svg = d3.select("#artist-visualization").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", totalHeight + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.makeMetricChangeGraph('Page Likes Change', data, svg, x, 0, metricChangeHeight, width);
      this.makeEventGraph(data, svg, x, metricChangeHeight + spacing, eventHeight, width);
    };

    this.makeMetricChangeGraph = function (dataKey, data, svg, x, top, height, width) {
      // Plot metric data

      // Make an idiomatic CSS suffix of the key
      var keyIdSuffix = '-' + dataKey.toLowerCase().replace(/ /g, '-');

      var y = d3.scale.linear()
          .range([top + height, top])
          .domain([d3.min(data, function(d) { return d[dataKey]; }), d3.max(data, function(d) { return d[dataKey]; })]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var positiveArea = d3.svg.area(data)
          .x(function (d) { return x(d.day); })
          .y0(function () { return y(0); })
          .y1(function (d) { return y(d[dataKey]); });

      var negativeArea = d3.svg.area(data)
          .x(function (d) { return x(d.day); })
          .y0(function (d) { return y(d[dataKey]); })
          .y1(function () { return y(0); });

      svg.append("path")
        .datum(data)
        .attr("class", "area-positive")
        .attr("d", positiveArea)
        .attr("clip-path", "url(#positive-area" + keyIdSuffix + ")");

      svg.append("path")
        .datum(data)
        .attr("class", "area-negative")
        .attr("d", negativeArea)
        .attr("clip-path", "url(#negative-area" + keyIdSuffix + ")");

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Clip the negative part off the positive area graph and vice versa
      svg.append("g")
        .append("clipPath")
          .attr("id", 'positive-area' + keyIdSuffix)
        .append("rect")
          .attr("x", 0)
          .attr("y", top)
          .attr("width", width)                     
          .attr("height", y(0))

      svg.append("g")
        .append("clipPath")
          .attr("id", 'negative-area' + keyIdSuffix)
        .append("rect")
          .attr("x", 0)
          .attr("y", y(0))
          .attr("width", width)                     
          .attr("height", height - y(0))
      
      // Add text labels
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -170)
          .attr("y", -45)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Daily " + dataKey);
    };

    this.makeEventGraph = function (data, svg, x, top, height, width) {
      // Plot event data

      // For this, we're better off with a flat list of all events
      var allEvents = _(data)
        .pairs()
        .map(function (entry) { 
          // If there are any events, return [day, event] for each of them
          return entry[1].events 
            ? entry[1].events.map(function (event, index) { return [entry[1].day, index + 1, event]; }) 
            : []; 
          })
        .flatten(true) // combine all daily event sets
        .value();

      var eventsMax = d3.max(data, function(d) { return d.events ? d.events.length : 0; });

      var y = d3.scale.linear()
        .range([top, top + height])
        .domain([1, eventsMax]);

      var color = d3.scale.category10();

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(Math.min(eventsMax, 10));

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -20 + -top)
          .attr("y", -45)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Artist Events");

      svg.selectAll(".dot")
          .data(allEvents)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d[0]); })
          .attr("cy", function(d) { return y(d[1]); })
          .style("fill", function(d) { return color(d[2].event_type_id); });
    };

  });
