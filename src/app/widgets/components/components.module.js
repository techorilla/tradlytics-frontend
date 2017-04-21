/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('app.widgets.components', [
    'app.widgets.components.mail',
    'app.widgets.components.timeline',
    'app.widgets.components.tree',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('components', {
          url: '/components',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Components',
          // sidebarMeta: {
          //   icon: 'ion-gear-a',
          //   order: 100,
          // },
        });
  }

})();
