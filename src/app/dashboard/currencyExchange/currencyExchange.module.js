(function () {
    'use strict';

    angular.module('app.dashboard.currencyExchange', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard.currencyExchange', {
                url: '/currency',
                abstract: true,
                title: 'Currency Exchange',
                views: {
                    'content@dashboard': {
                        template: '<div ui-view="content"></div>'
                    }
                }
            })
            .state('dashboard.currencyExchange.dashboard',{
                url:'/exchange/:currencyIn/:currencyOut',
                views:{
                    'content@dashboard.currencyExchange':{
                        templateUrl:'app/dashboard/currencyExchange/currencyDashboard.html',
                        controller: 'CurrencyDashboard as vm'

                    }
                }
            });
    }
})();