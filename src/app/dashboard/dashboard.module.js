/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('app.dashboard', [
        'app.dashboard.website',
        'app.dashboard.user',
        'app.dashboard.products',
        'app.dashboard.businessPartner',
        'app.dashboard.tradeBook',
        'app.dashboard.localTradeBook',
        'app.dashboard.settings',
        'app.dashboard.modals',
        'app.dashboard.pricing',
        'app.dashboard.manifest',
        'app.dashboard.documentCreator',
        'app.dashboard.shipping',
        'app.dashboard.currencyExchange',
        'app.dashboard.accounts',
        'app.dashboard.inventory'
    ]).config(routeConfig);



    /** @ngInject */
    function routeConfig($stateProvider, baSidebarServiceProvider){
        baSidebarServiceProvider.addStaticItem({
            title: 'Dashboard',
            priority: 1,
            icon: 'ion-ios-pulse-strong',
            stateRef: 'dashboard.main'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Products',
            icon: 'ion-bag',
            priority: 2,
            subMenu: [
                {
                    title: 'Categories',
                    stateRef: 'dashboard.productsCategories'
                },
                {
                    title: 'Products',
                    stateRef: 'dashboard.products'
                },
                {
                    title: 'Product Items',
                    stateRef: 'dashboard.productsItems'
                },
                {
                    title: 'Keywords',
                    stateRef: 'dashboard.productKeywords'
                }

            ]
        });

        baSidebarServiceProvider.addStaticItem({
            title: 'Manifest',
            priority: 3,
            icon: 'ion-android-clipboard',
            stateRef: 'dashboard.manifestDashboard'
        });

        baSidebarServiceProvider.addStaticItem({
            title: 'Pricing',
            priority: 4,
            icon: 'ion-arrow-graph-up-right',
            stateRef: 'dashboard.pricing.dashboard'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Business Partner',
            priority: 5,
            icon: 'ion-ios-people',
            stateRef: 'dashboard.businessPartner'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Inventory',
            priority: 6,
            icon: 'ion-clipboard',
            stateRef: 'dashboard.inventory.dashboard'
        });
        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Trade Book',
        //     icon: 'ion-social-usd',
        //     stateRef: 'dashboard.tradeDashboard'
        // });
        baSidebarServiceProvider.addStaticItem({
            title: 'Local Trade Book',
            priority: 8,
            icon: 'ion-social-usd',
            stateRef: 'dashboard.localTradeBook'
        });


        baSidebarServiceProvider.addStaticItem({
            title: 'Accounts',
            priority: 9,
            icon: 'ion-calculator',
            stateRef: 'dashboard.accounts.main'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Website',
            priority: 10,
            icon: 'ion-ios-monitor',
            stateRef: 'dashboard.website'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Shipment',
            priority: 11,
            icon: 'ion-android-boat',
            stateRef: 'dashboard.shipping'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Document Creator',
            priority: 12,
            icon: 'ion-android-document',
            stateRef: 'dashboard.documentCreator'
        });

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Settings',
        //     icon: 'ion-android-settings',
        //     stateRef: 'dashboard.settings'
        // });




        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                abstract: true,
                title:'Dashboard',
                views: {
                    '@': {
                        templateUrl:'app/dashboard/shell/shell.html'
                    }
                },
                resolve:{
                    userData: function(authentication){
                        return authentication.getUserData();
                    }
                }
            })
            .state('dashboard.main', {
                url: '/main',
                title:'Dashboard',
                pageHeader:{
                    subTitle: 'Business',
                    title:'Dashboard',
                    headerAnchor: [

                    ]
                },
                resolve:{
                  completeReport: function(dashboard, loaderModal){
                      loaderModal.open();
                      return dashboard.getCompleteDashboardReport().then(function(res){
                         return res.data;
                      }).finally(function(){
                          loaderModal.close();
                      });
                  }
                },
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/dashboard.html',
                        controller: 'Dashboard as vm'
                    }
                }
            });
    }

})();
