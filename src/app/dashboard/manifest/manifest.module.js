(function () {
    'use strict';

    angular.module('app.dashboard.manifest', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('dashboard.manifest', {
                url: '/manifest',
                title:'Manifest',
                pageHeader:{
                    subTitle: 'Port',
                    title:'Manifest'
                },
                views: {
                    'content@dashboard':{
                        controller: 'Manifest as vm',
                        templateUrl:'app/dashboard/manifest/manifest.html'
                    }
                }
            })
            .state('dashboard.manifestDashboard', {
                url: '/manifestReport',
                title:'Manifest Report',
                pageHeader:{
                    subTitle: 'Manifest',
                    title:'Report'
                },
                views:{
                    'content@dashboard':{
                        controller: 'ManifestDashboard as vm',
                        templateUrl:'app/dashboard/manifest/manifestDashboard.html'
                    }
                }
            });

    }

})();
