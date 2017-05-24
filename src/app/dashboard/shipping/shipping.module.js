(function () {
    'use strict';

    angular.module('app.dashboard.shipping', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.shipping', {
                url: '/documentCreator',
                title: 'Document Creator',
                views: {
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/shipping.html',
                        controller: 'Shipping as vm'
                    }
                },
            });
    }
})();