(function () {
    'use strict';

    angular.module('app.dashboard.settings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider){
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
            })
            .state('dashboard.settings.dashboardProducts',{
                url:'/dashboardProducts',
                title: 'Dashboard Products',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/dashboardProducts/dashboardProducts.html'

                    }
                }
            })
            .state('dashboard.settings.appDropDowns',{
                url:'/dropDowns',
                title: 'Application Drop Downs',
                hasAccordianDropDown: true
            })
            .state('dashboard.settings.appDropDowns.transactionStatus',{
                url:'/transactionStatus',
                title: 'Transaction Status',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.transactionStatus).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.transactionStatus;
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            })
            .state('dashboard.settings.appDropDowns.bpTypes',{
                url:'/bpTypes',
                title: 'Business Partner Type',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.businessType).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.businessType;
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            })
            .state('dashboard.settings.appDropDowns.contractTypes',{
                url:'/contractTypes',
                title: 'Transaction Contract Type',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.contractType).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.contractType;
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            })
            .state('dashboard.settings.appDropDowns.designation',{
                url:'/contractTypes',
                title: 'User Designation',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.designation).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.designation;
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            })
            .state('dashboard.settings.appDropDowns.contactType',{
                url:'/contactTypes',
                title: 'Contact Type',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.contactType).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.contactType;
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            })
            .state('dashboard.settings.appDropDowns.productKeywords',{
                url:'/productQuality',
                title: 'Product Quality Keywords',
                views:{
                    'subContent@dashboard.settings':{
                        templateUrl:'app/dashboard/settings/appDropDowns/appDropDown.html',
                        controller: 'appDropDown as vm'
                    }
                },
                resolve:{
                    list: function(settings, apiEndPoints, crud){
                        return settings.dropDown[crud.READ](apiEndPoints.dropDown.productQuality).then(function(response){
                            return response.list;
                        });
                    },
                    endPoint: function(apiEndPoints){
                        return apiEndPoints.dropDown.productQuality
                    },
                    page: function(modalTemplates){
                        return modalTemplates.CR_UP_BASIC_DROP_DOWN;
                    }
                }
            });

    }

})();
