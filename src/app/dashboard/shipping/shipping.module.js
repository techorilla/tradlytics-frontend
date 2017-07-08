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
                pageHeader:{
                    subTitle: 'Shipment Module',
                    title:'Shipment',
                    headerAnchor: [
                        {
                            text: 'Shipping Ports',
                            state: 'dashboard.shipping.ports'
                        },
                        {
                            text: 'Shipping Lines',
                            state: 'dashboard.shipping.lines'
                        },
                        {
                            text: 'Shipping Vessel',
                            state: 'dashboard.shipping.vessel'
                        }

                    ]
                }
            })

            .state('dashboard.shipping.ports', {
                url:'/ports',
                title: 'Ports',
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard/shipping/ports.html',
                        controller: 'Ports as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'All Shipment',
                    title:'Ports',
                    headerAnchor: [
                        {
                            text: 'Add New Shipping Port',
                            state: 'dashboard.shipping.ports.form({id:"new"})'
                        }
                    ]
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
                },
                pageHeader:{
                    goBack: true,
                    subTitle: 'Shipping',
                    title:'Port'
                }
            })

            .state('dashboard.shipping.lines',{
                url:'/shippingLine',
                title: 'Shipping Line',
                views:{
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/shippingLine.html',
                        controller: 'ShippingLine as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'All',
                    title:'Shipping Line',
                    goBack: true,
                    headerAnchor: [
                        {
                            text: 'Add New Shipping Line',
                            state: 'dashboard.shipping.lines.form({id:"new"})'
                        }
                    ]
                }
            })
            .state('dashboard.shipping.lines.form', {
                url: '/:id',
                title: 'Shipping Line',
                views:{
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/shippingLineForm.html',
                        controller: 'ShippingLineForm as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Add New',
                    title:'Shipping Line',
                    goBack: true
                }
            })
            .state('dashboard.shipping.vessel', {
                url: 'vessel',
                views:{
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/vessel.html',
                        controller: 'Vessel as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'All',
                    title:'Shipping Vessel',
                    headerAnchor: [
                        {
                            text: 'Add New Shipping Vessel',
                            state: 'dashboard.shipping.vessel.form({id:"new"})'
                        }
                    ],
                    back: true
                }


            })
            .state('dashboard.shipping.vessel.form', {
                url: '/:id',
                title: 'Shipping Vessel',
                views:{
                    'content@dashboard': {
                        templateUrl: 'app/dashboard/shipping/vesselForm.html',
                        controller: 'VesselForm as vm'
                    }
                }
            })
        ;
    }
})();