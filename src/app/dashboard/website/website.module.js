(function () {
    'use strict';

    angular.module('app.dashboard.website', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider){



        $stateProvider
            .state('dashboard.website', {
                url: '/website',
                title:'Website',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/website/website.html'
                    }
                }
            })

            .state('dashboard.website.blog', {
                url: '/blog',
                title:'Website Management',
                views: {
                    'websiteContent@dashboard.website':{
                        templateUrl:'app/dashboard/website/website.html'
                    }
                }
            })

        ;
    }

})();
