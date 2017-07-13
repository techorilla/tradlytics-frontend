(function () {
    'use strict';

    angular.module('app.dashboard.accounts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard.accounts', {
                url: '/accounts',
                abstract: true,
                title: 'Accounts',
                views: {
                    'content@dashboard': {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('dashboard.accounts.main', {
                url: '/accounts',
                title: 'Accounts',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/dashboard.html',
                        controller: 'AccountDashboard as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Accounts',
                    title:'Dashboard',
                    headerAnchor: [
                        {
                            text: 'Commission Flow',
                            state: 'dashboard.accounts.commissionFlow'
                        },
                        {
                            text: 'Invoices',
                            state: 'dashboard.accounts.invoice'
                        }
                    ]
                }
            })

            .state('dashboard.accounts.invoice',{
                url:'/invoice',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/invoice/invoice.html',
                        controller: 'Invoice as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Invoices',
                    title:'Manager',
                    headerAnchor: [
                        {
                            text: 'Add New Shipping Vessel',
                            state: 'dashboard.shipping.vessel.form({id:"new"})'
                        }
                    ],
                    back: true
                }
            })

            .state('dashboard.accounts.commissionFlow',{
                url:'/commissionFlow',
                views:{
                    'content@dashboard.accounts':{
                        templateUrl:'app/dashboard/accounts/commissionFlow/commissionFlow.html',
                        controller: 'CommissionFlow as vm'
                    }
                }
            });
    }
})();