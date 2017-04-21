/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('app.widgets.ui', [
    'app.widgets.ui.typography',
    'app.widgets.ui.buttons',
    'app.widgets.ui.icons',
    'app.widgets.ui.modals',
    'app.widgets.ui.grid',
    'app.widgets.ui.alerts',
    'app.widgets.ui.progressBars',
    'app.widgets.ui.notifications',
    'app.widgets.ui.tabs',
    'app.widgets.ui.slider',
    'app.widgets.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          // sidebarMeta: {
          //   icon: 'ion-android-laptop',
          //   order: 200,
          // },
        });
  }

})();
