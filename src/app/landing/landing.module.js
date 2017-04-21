(function () {
    'use strict';

    angular.module('app.landing', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('landing', {
                nodashBackground: true,
                url: '/landing',
                views: {
                    '@': {
                        templateUrl:'app/landing/shell/shell.html'
                    },
                    'header@landing':{
                        templateUrl:'app/landing/shell/header.html'
                    }
                }
            })
            .state('landing.home', {
                url: '/home',
                nodashBackground: true,
                title:'Home',
                views: {
                    'content@landing':{
                        templateUrl:'app/landing/home/home.html',
                        controller: 'homeCtrl as vm'
                    }
                }
            });
    }

})();
