/**
 * @ngdoc overview
 * @name app.businessPartner
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.businessPartner', [])
        .config(configuration);

    /* @ngInject */
    function configuration($stateProvider){
        $stateProvider
            .state('dashboard.businessPartner', {
                url:'/businessPartner',
                subNav: true,
                subNavTitle: 'Business Partner',
                views:{
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/businessPartner/businessPartner.html',
                        controller: 'BusinessPartner as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Business'
                },
                resolve: {
                    'allBusiness': function(businessPartner, loaderModal){
                        loaderModal.open();
                        return businessPartner.getBusinessPartnerList().then(function(res){
                            loaderModal.close();
                            return res.businessList;
                        });
                    }
                }

            });

    }

}());
