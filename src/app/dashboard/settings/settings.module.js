(function () {
    'use strict';

    angular.module('app.dashboard.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        // $urlRouterProvider.when('/dashboard/settings/','/dashboard/settings/transactionStatus');
        $stateProvider
            .state('dashboard.settings', {
                url: '/settings',
                title:'Settings',
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Settings'
                },
                views: {
                    'content@dashboard':{
                        templateUrl:'app/dashboard/settings/settings.html',
                        controller: 'settings as vm'
                    }
                }
            });


            // .state('dashboard.settings.transactionStatus',{
            //     url:'/transactionStatus',
            //     title: 'Transaction Status',
            //     views:{
            //         'content@dashboard.settings':{
            //             templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
            //             controller: 'appDropDown as vm'
            //         }
            //     },
            //     resolve:{
            //         list: function(settings, apiEndPoints, crud){
            //             return settings.dropDown[crud.READ](apiEndPoints.dropDown.transactionStatus).then(function(response){
            //                 return response.list;
            //             });
            //         },
            //         endPoint: function(apiEndPoints){
            //             return apiEndPoints.dropDown.transactionStatus;
            //         },
            //         page: function(modalTemplates){
            //             return modalTemplates.CR_UP_BASIC_DROP_DOWN;
            //         }
            //     }
            // })
            // .state('dashboard.settings.bpTypes',{
            //     url:'/bpTypes',
            //     title: 'Business Partner Type',
            //     views:{
            //         'content@dashboard.settings':{
            //             templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
            //             controller: 'appDropDown as vm'
            //         }
            //     },
            //     resolve:{
            //         list: function(settings, apiEndPoints, crud){
            //             return settings.dropDown[crud.READ](apiEndPoints.dropDown.businessType).then(function(response){
            //                 return response.list;
            //             });
            //         },
            //         endPoint: function(apiEndPoints){
            //             return apiEndPoints.dropDown.businessType;
            //         },
            //         page: function(modalTemplates){
            //             return modalTemplates.CR_UP_BASIC_DROP_DOWN;
            //         }
            //     }
            // })
            // .state('dashboard.settings.contractTypes',{
            //     url:'/contractTypes',
            //     title: 'Transaction Contract Type',
            //     views:{
            //         'content@dashboard.settings':{
            //             templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
            //             controller: 'appDropDown as vm'
            //         }
            //     },
            //     resolve:{
            //         list: function(settings, apiEndPoints, crud){
            //             return settings.dropDown[crud.READ](apiEndPoints.dropDown.contractType).then(function(response){
            //                 return response.list;
            //             });
            //         },
            //         endPoint: function(apiEndPoints){
            //             return apiEndPoints.dropDown.contractType;
            //         },
            //         page: function(modalTemplates){
            //             return modalTemplates.CR_UP_BASIC_DROP_DOWN;
            //         }
            //     }
            // })
            // .state('dashboard.settings.designation',{
            //     url:'/contractTypes',
            //     title: 'User Designation',
            //     views:{
            //         'content@dashboard.settings':{
            //             templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
            //             controller: 'appDropDown as vm'
            //         }
            //     },
            //     resolve:{
            //         list: function(settings, apiEndPoints, crud){
            //             return settings.dropDown[crud.READ](apiEndPoints.dropDown.designation).then(function(response){
            //                 return response.list;
            //             });
            //         },
            //         endPoint: function(apiEndPoints){
            //             return apiEndPoints.dropDown.designation;
            //         },
            //         page: function(modalTemplates){
            //             return modalTemplates.CR_UP_BASIC_DROP_DOWN;
            //         }
            //     }
            // })
            // .state('dashboard.settings.contactType',{
            //     url:'/contactTypes',
            //     title: 'Contact Type',
            //     views:{
            //         'content@dashboard.settings':{
            //             templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
            //             controller: 'appDropDown as vm'
            //         }
            //     },
            //     resolve:{
            //         list: function(settings, apiEndPoints, crud){
            //             return settings.dropDown[crud.READ](apiEndPoints.dropDown.contactType).then(function(response){
            //                 return response.list;
            //             });
            //         },
            //         endPoint: function(apiEndPoints){
            //             return apiEndPoints.dropDown.contactType;
            //         },
            //         page: function(modalTemplates){
            //             return modalTemplates.CR_UP_BASIC_DROP_DOWN;
            //         }
            //     }
            // });

    }

})();
