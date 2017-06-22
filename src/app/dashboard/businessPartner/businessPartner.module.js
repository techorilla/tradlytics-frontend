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
                    'allBusiness': function(businessPartner, loaderModal, $state){
                        if($state.current.name==='dashboard.businessPartner.form'){
                            return [];
                        }
                        else{
                            loaderModal.open();

                            return businessPartner.getBusinessPartnerList('A').then(function(res){
                                loaderModal.close();
                                return res.businessList;
                            });
                        }
                    }
                }
            })
            .state('dashboard.businessPartner.form', {
                url:'/form/:id',
                views:{
                    'content@dashboard':{
                        templateUrl: 'app/dashboard/businessPartner/businessPartnerForm.html',
                        controller: 'BusinessPartner as vm'
                    }
                }
            });

    }

}());
