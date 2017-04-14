(function () {
    'use strict';

    angular.module('app.dashboard.website', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider){



        $stateProvider
            .state('dashboard.website', {
                url: '/website',
                title:'Website Managment',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/website/website.html',
                        controller:'Website as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Website',
                    title:'Dashboard'
                }
            })

            .state('dashboard.websiteBlog', {
                url: '/research',
                title:'Website Research',
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/website/blog.html',
                        controller: 'Blog as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Research',
                    title:'Manager'
                }
            })

        ;
    }

})();
