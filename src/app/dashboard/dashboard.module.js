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
        'app.dashboard.settings',
        'app.dashboard.modals'
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
            stateRef: 'dashboard.products'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Trade Book',
            icon: 'ion-social-usd',
            stateRef: 'dashboard.tradeBook'
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
            stateRef: 'dashboard.accounts'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Website',
            icon: 'ion-ios-monitor',
            stateRef: 'dashboard.website'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Shipment',
            icon: 'ion-android-boat',
            stateRef: 'dashboard.shipment'
        });
        baSidebarServiceProvider.addStaticItem({
            title: 'Settings',
            icon: 'ion-android-settings',
            stateRef: 'dashboard.settings'
        });


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
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/dashboard.html'
                    }
                }
            });
    }

})();
