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
            icon: 'ion-ios-pulse-strong',
            stateRef: 'dashboard.main'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Products',
            icon: 'ion-bag',
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
            icon: 'ion-android-clipboard',
            stateRef: 'dashboard.manifestDashboard'
        });

        baSidebarServiceProvider.addStaticItem({
            title: 'Pricing',
            icon: 'ion-arrow-graph-up-right',
            stateRef: 'dashboard.pricing.dashboard'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Inventory',
            icon: 'ion-clipboard',
            stateRef: 'dashboard.inventory.dashboard'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Trade Book',
            icon: 'ion-social-usd',
            stateRef: 'dashboard.tradeDashboard'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Local Trade Book',
            icon: 'ion-social-usd',
            stateRef: 'dashboard.localTradeBook'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Business Partner',
            icon: 'ion-ios-people',
            stateRef: 'dashboard.businessPartner'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'User Management',
            icon: 'ion-android-contacts',
            stateRef: 'dashboard.user.list'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Accounts',
            icon: 'ion-calculator',
            stateRef: 'dashboard.accounts.main'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Website',
            icon: 'ion-ios-monitor',
            stateRef: 'dashboard.website'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Shipment',
            icon: 'ion-android-boat',
            stateRef: 'dashboard.shipping'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Document Creator',
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
