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
            self: 'self',
            report: 'report'
        },
        dashboard: {
            main:'dashboard',
            searchPageTop: 'search_top'
        },
        manifest: 'manifest',
        manifestDashboard: 'manifest/dashboard',
        transaction:{
            main:'transactions',
            dashboard: 'dashboard',
            businessAnalytics: 'businessAnalytics',
            list: 'list',
            basic: 'basic',
            commission: 'commission',
            contract: 'contract',
            document: 'document',
            note: 'note',
            secondary: 'secondary',
            shipmentStatus: 'shipmentStatus',
            completeStatus: 'completeStatus',
            washout: 'washout',
            cashFlow: 'cash_flow',
            arrivedAtPortInfo: 'arrived_at_port_info',
            notShippedInfo: 'not_shipped_info',
            shippedInfo: 'shipped_info',
            approbationReceivedInfo: 'approbation_received_info',
            dispute: 'dispute',
            analytics: 'businessAnalytics'

        },
        shipping:{
            main: 'shipping',
            ports: 'ports',
            shippingLine: 'line',
            shippingVessel: 'vessel',
            shippingVesselTag: 'vessel_tag',
            portTag: 'port_tag'
        },
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
            business: 'business',
            shippingLine: 'shipping_line',
            ports: 'ports',
            vessel: 'vessel',
            warehouses: 'warehouses',
            transaction: 'transaction',
            localTrade: 'localTransaction'
        },
        product: 'product',
        productTags:'product_tags',
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
        },
        currencyExchange: {
            main:'currency_exchange',
            dashboard:'dashboard'
        },
        accounts: {
            main: 'accounts',
            dashboard: 'dashboard',
            commissionFlow: 'commission_flow',
            invoice: 'invoice'
        },
        notification:{
            main: 'notifications',
            unreadCount: 'api/unread_count',
            unreadList: 'api/unread_list'
        },
        inventory:{
            main: 'inventory',
            warehouse: 'warehouse',
            warehouseRent: 'warehouse_rent',
            dashboard: 'dashboard',
            transaction: 'transaction',
            warehouseProductReport: 'warehouse_product_report',
            warehouseBusinessReport: 'warehouse_business_report'
        },
        localTrade:{
            main:'local_trade',
            trade: 'trade',
            tradeStatus: 'trade/status',
            tradeList:'trade/list',
            dashboard: 'dashboard',
            deliverySlip: 'delivery_slip'
        }

    };

    angular
        .module('app.core')
        .constant('apiEndPoints', apiEndPoints)

}());


