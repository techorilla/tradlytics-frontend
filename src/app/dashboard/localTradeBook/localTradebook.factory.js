
(function() {

    'use strict';

    var paymentTerms = {
        ADVANCE: 'advance',
        PRODUCT_DELIVERY: 'product_delivery',
        ON_DATE: 'on_date'

    };

    angular
        .module('app.dashboard.localTradeBook')
        .constant('paymentTerms', paymentTerms)
        .factory('localTradeBook', localTradeBook);



    /* @ngInject */
    function localTradeBook(Restangular, apiEndPoints, utilities, paymentTerms){
        var localAPI = Restangular.all(apiEndPoints.localTrade.main);
        var localTradeAPI = localAPI.all(apiEndPoints.localTrade.trade);
        var locatTradeListAPI = localAPI.all(apiEndPoints.localTrade.tradeList);
        var localTradeStatusAPI = localAPI.all(apiEndPoints.localTrade.tradeStatus);
        var localTradeDeliverySlipAPI = localAPI.all(apiEndPoints.localTrade.deliverySlip);
        var localTradeDashboardAPI = localAPI.all(apiEndPoints.localTrade.deliverySlip);


        return {
            getNewLocalTrade: getNewLocalTrade,
            addLocalTrade: addLocalTrade,
            updateLocalTrade: updateLocalTrade,
            getTransactionList: getTransactionList,
            getTransactionDetail: getTransactionDetail
        };

        function getTransactionList(dateRange, pageType){
            var queryParams = angular.copy(dateRange);
            queryParams =  angular.extend(queryParams, {
                'pageType': pageType
            });
            return locatTradeListAPI.customGET('',queryParams);
        }

        function addLocalTrade(trade){
            return localTradeAPI.customPOST(trade);
        }

        function updateLocalTrade(trade){
            return localTradeAPI.customPUT(trade);
        }

        function getTransactionDetail(tradeId, full){
            return localTradeAPI.customGET('',{
                'tradeId': tradeId,
                'full': full
            });
        }

        function getNewLocalTrade(){
            return {
                date: null,
                buyerId: null,
                sellerId: null,
                productItemId: null,
                quantityFCL: 0,
                quantity: 0.00,
                price: 0.00,
                fileId: null,
                contractId: '',
                deliveryDueDate: null,
                fundsDueDate:null,
                internationalFileId: null,
                otherInfo: '',
                paymentDate: null,
                paymentTerm: paymentTerms.ADVANCE
            };
        }
    }


})();