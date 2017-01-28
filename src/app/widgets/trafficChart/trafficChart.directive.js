/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.widgets')
      .directive('trafficChart', trafficChart);

  /** @ngInject */
  function trafficChart() {
    console.log('sex');
    return {
      restrict: 'E',
      controller: 'TrafficChartCtrl',
      templateUrl: 'app/widgets/trafficChart/trafficChart.html'
    };
  }
})();