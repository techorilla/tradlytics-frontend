/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('app.widgets.charts', [
      'app.widgets.charts.amCharts',
      'app.widgets.charts.chartJs',
      'app.widgets.charts.chartist',
      'app.widgets.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view></div>',
          title: 'Charts',
          // sidebarMeta: {
          //   icon: 'ion-stats-bars',
          //   order: 150,
          // },
        });
  }

})();
