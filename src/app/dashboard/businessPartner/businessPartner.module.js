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
                        templateUrl: 'app/dashboard/businessPartner/businessPartner.template.html',
                        controller: 'BusinessPartner as vm'
                    }
                },
                pageHeader:{
                    subTitle: 'Manage',
                    title:'Business Partners'
                }
            }
        ).state('dashboard.addBusinessPartner',{
                url:'/:operation/:id',
                resolve:{
                    tabFilter: 'tabFilter',
                    originConfig: function (tabFilter) {
                        return tabFilter.getAllCountries().then(function (res) {
                            return tabFilter.getOriginConfig(res.data.origins);

                        });
                    },
                    bpTypes: function(tabFilter){
                        return tabFilter.getBusinessPartnerTypes().then(function(res){
                            return res.data.bpTypes;
                        });
                    },
                    contractTypes: function(tabFilter){
                        return tabFilter.getBuyerContractTypes().then(function(res){
                            return res.data.contractTypes;
                        });
                    }
                },
                views:{
                    'content@dashboard':{
                        templateUrl:'app/dashboard//businessPartner/addBusinessPartner/addBusinessPartner.html',
                        controller: 'AddBusinessPartner as vm'
                    }
                }
            })
            .state('shell.businessPartner.view',{
                url:'/bp/view/:id',
                resolve: {
                    tabFilter: 'tabFilter',
                    originConfig: function (tabFilter) {
                        return tabFilter.getAllCountries().then(function (res) {
                            return tabFilter.getOriginConfig(res.data.origins);

                        });
                    },
                    bp: function(businessPartner,$stateParams){
                        return businessPartner.getBusinessPartnerComplete($stateParams.id).then(function(res){
                            return res.data;
                        });
                    }
                },
                views:{
                    'content@dashboard':{
                        templateUrl: 'app/dashboard//businessPartner/businessPartnerInfo.html',
                        controller: 'BusinessPartnerInfo as vm'
                    },
                    'bpProducts@dashboard.businessPartner.view':{
                        templateUrl:'app/dashboard//businessPartner/products/products.html',
                        controller: 'BpProduct as vm'
                    },
                    'bpContactNumbers@dashboard.businessPartner.view':{
                        templateUrl:'app/dashboard//businessPartner/contactNumbers/contactNumbers.html',
                        controller: 'BpContactNumbers as vm'
                    },
                    'bpContactPersons@dashboard.businessPartner.view':{
                        templateUrl:'app/dashboard//businessPartner/contactPersons/contactPersons.html',
                        controller: 'BpContactPersons as vm'

                    },
                    'bpBankDetails@dashboard.businessPartner.view':{
                        templateUrl:'app/dashboard/businessPartner/bankDetails/bankDetails.html',
                        controller: 'BpBankDetails as vm'
                    }

                }
            });
    }

}());
