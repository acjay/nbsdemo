'use strict';

angular.module('nbsdemoApp')
  .service('Util', function Util() {
    this.dateToDays = function (date) {
    	return Math.floor((new Date(date)).getTime() / (86400 * 1000));
    };
    this.daysToDate = function (day) {
    	return new Date(day * 86400 * 1000);
    };
    this.isValidDate = function (date) {
    	return _.isDate(new Date(date));
    };
  });
