(function () {
    'use strict';

    angular.module('app.dashboard.documentCreator', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.documentCreator', {
                url: '/documentCreator',
                title: 'Document Creator',
                views: {
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/documentCreator/documentCreator.html',
                        controller: 'DocumentCreator as vm'
                    }
                },
            });
    }
})();