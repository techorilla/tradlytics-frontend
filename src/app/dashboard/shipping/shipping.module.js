(function () {
    'use strict';

    angular.module('app.dashboard.shipping', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.shipping', {
                url: '/shipment',
                title: 'Shipment',
                views: {
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/shipping.html',
                        controller: 'Shipping as vm'
                    }
                },
            })

            .state('dashboard.shipping.ports', {
                url:'/ports',
                title: 'Ports',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/shipping/ports.html',
                        controller: 'Ports as vm'
                    }
                }
            })
            .state('dashboard.shipping.ports.form', {
                url:'/:id',
                title: 'Ports',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/shipping/portForm.html',
                        controller: 'Ports as vm'
                    }
                }
            });
    }
})();