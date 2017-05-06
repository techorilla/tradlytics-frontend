/**
 * @ngdoc object
 * @name app.core.constant:httpStatus
 * @description Commonly consumed HTTP Request Codes exposed as an injectable object
 * @example
 <pre>
 angular.module("someModule", [])
 .controller("some", controller);

 function controller(httpStatus, someService){
  var vm = this;
  someService.get().then(function(res){
    if(res.status === httpStatus.OK){
      vm.users = res.data;
    }
   })
  };
 </pre>
 */

(function(){

    'use strict';

    var apiEndPoints = {
        authentication: {
            basic:'auth',
            googleAnalytics: 'google_analytics',
        },
        login: 'login',
        logout: 'logout',
        user:'user',
        changePassword: 'changePassword',
        bp:{
            main:'business',
            list: 'list',
            basic:'basic',
            bank:'bank',
            location:'location',
            contactPerson:'contact_person',
            contactNumber:'contact_number',
            product:'product',
            self: 'self'
        },
        dashboard:'dashboard',
        manifest: 'manifest',
        manifestDashboard: 'manifest/dashboard',
        transactionBasic: 'transactions/basic',
        transactionCommission: 'transactions/commission',
        transactionContract: 'transactions/contract',
        transactionDocument: 'transactions/document',
        transactionNote: 'transactions/note',
        transactionSecondary: 'transactions/secondary',
        tabFilters: 'tabFilters',
        pricing: 'pricing',
        pricingSummary: 'summary',
        pricingMarket: 'price_market',
        productItem: 'product_item',
        productItemPriceOnWebsite: 'price_on_website',
        productPriceReport: 'price_report',
        dropDown:{
            main: 'dropDown',
            bpType: 'business_type',
            productItem: 'product_item',
            businessType: 'business_type',
            contactType: 'contact_type',
            contractType: 'contract_type',
            designation: 'designation',
            productKeywords: 'product_keywords',
            transactionStatus: 'transaction_status',
            productCategory: 'product_category',
            country: 'country',
            region: 'region',
            city: 'city',
            commissionType: 'commission_type',
            packaging: 'packaging',
            product: 'product_drop_down',
            productOrigin: 'product_origin',
            currency: 'currency',
            priceMarket: 'price_market',
            shipmentMonth: 'shipment_month',
            priceMetric: 'price_metric',
            business: 'business'
        },
        product: 'product',
        productWebsiteStatus: 'website_status',
        productOrigin: 'origin',
        productKeywords: 'keywords',
        productCategory: 'category',
        productCategorySpecification:'category/specification',
        website:{
            basic: 'website',
            research: 'research',
            researchTags: 'research_tags',
            homeSlider: 'homeSlider',
            team: 'team',
            dashboard:'dashboard'
        }

    };

    angular
        .module('app.core')
        .constant('apiEndPoints', apiEndPoints)

}());


